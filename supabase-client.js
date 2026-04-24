/*
 * T051 — Supabase client for Efterplan
 *
 * Anon key is safe to ship in the browser (Supabase designs it for this).
 * Security is enforced by RLS — see supabase/schema.sql.
 *
 * Until SUPABASE_CONFIG.url is filled in, every exported helper becomes a
 * no-op and the sign-in UI stays hidden. Existing localStorage-only flow
 * keeps working unchanged.
 *
 * Load order (index.html):
 *   1. https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js
 *   2. supabase-client.js    (this file)
 *   3. app.js
 */

window.SUPABASE_CONFIG = window.SUPABASE_CONFIG || {
  url: '',         // e.g. 'https://xxxxxxxxxxxx.supabase.co'
  anonKey: '',     // e.g. 'eyJhbGciOi...'
};

(function () {
  const cfg = window.SUPABASE_CONFIG;
  const configured = !!(cfg.url && cfg.anonKey);

  // Public API — stays usable whether or not Supabase is configured.
  const api = {
    isConfigured: configured,
    client: null,
    currentUser: null,

    async signInWithEmail(email) {
      if (!this.client) return { ok: false, error: 'not_configured' };
      const { error } = await this.client.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + '/' },
      });
      return { ok: !error, error: error?.message };
    },

    async signOut() {
      if (!this.client) return;
      await this.client.auth.signOut();
      this.currentUser = null;
    },

    async getSession() {
      if (!this.client) return null;
      const { data } = await this.client.auth.getSession();
      this.currentUser = data.session?.user || null;
      return data.session;
    },

    // ─── Plan sync ──────────────────────────────
    async upsertPlan(state) {
      if (!this.client || !this.currentUser) return null;
      const { data, error } = await this.client
        .from('plans')
        .upsert(
          { user_id: this.currentUser.id, state },
          { onConflict: 'user_id' }
        )
        .select()
        .single();
      if (error) { console.warn('[supabase] upsertPlan', error); return null; }
      return data;
    },

    async loadPlan() {
      if (!this.client || !this.currentUser) return null;
      const { data } = await this.client
        .from('plans')
        .select('*')
        .eq('user_id', this.currentUser.id)
        .maybeSingle();
      return data;
    },

    async saveTaskCompletion(planId, taskId, fields) {
      if (!this.client || !this.currentUser || !planId) return null;
      const row = { plan_id: planId, user_id: this.currentUser.id, task_id: taskId, ...fields };
      const { error } = await this.client
        .from('task_completions')
        .upsert(row, { onConflict: 'plan_id,task_id' });
      if (error) console.warn('[supabase] saveTaskCompletion', error);
    },

    async loadTaskCompletions(planId) {
      if (!this.client || !planId) return [];
      const { data } = await this.client
        .from('task_completions')
        .select('*')
        .eq('plan_id', planId);
      return data || [];
    },

    // ─── Sharing (T052) ─────────────────────────
    async createShareToken() {
      if (!this.client || !this.currentUser) return null;
      const token = _randomToken();
      const { data } = await this.client
        .from('plans')
        .update({ share_token: token, shared_at: new Date().toISOString() })
        .eq('user_id', this.currentUser.id)
        .select()
        .single();
      return data ? token : null;
    },

    async revokeShareToken() {
      if (!this.client || !this.currentUser) return;
      await this.client
        .from('plans')
        .update({ share_token: null, shared_at: null })
        .eq('user_id', this.currentUser.id);
    },

    async loadSharedPlan(token) {
      if (!this.client) return null;
      const { data: plan } = await this.client
        .from('plans')
        .select('id, state, share_token')
        .eq('share_token', token)
        .maybeSingle();
      if (!plan) return null;
      const { data: completions } = await this.client
        .from('task_completions')
        .select('*')
        .eq('plan_id', plan.id);
      return { plan, completions: completions || [] };
    },
  };

  function _randomToken() {
    // 128-bit url-safe token
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
  }

  if (configured && window.supabase?.createClient) {
    api.client = window.supabase.createClient(cfg.url, cfg.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });

    // Hydrate current user, then notify app.
    api.getSession().then(() => {
      document.body.classList.toggle('has-supabase-session', !!api.currentUser);
      document.dispatchEvent(new CustomEvent('supabase:ready', { detail: { user: api.currentUser } }));
    });

    api.client.auth.onAuthStateChange((_event, session) => {
      api.currentUser = session?.user || null;
      document.body.classList.toggle('has-supabase-session', !!api.currentUser);
      document.dispatchEvent(new CustomEvent('supabase:authchange', { detail: { user: api.currentUser } }));
    });

    document.body.classList.add('has-supabase');
  } else {
    document.body.classList.add('no-supabase');
  }

  window.EfterplanSupabase = api;
})();
