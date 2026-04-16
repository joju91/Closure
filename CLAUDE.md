# CLAUDE.md — Conventions & Working Rules

Guidance for Claude working on this repository.

## Core Rule: Announce, Then Execute

**Never announce a tool call or action without immediately executing it in the same response.**

Do NOT write:
> "I will now push the files."

...and then end the response without calling the push tool.

Instead:
- Write what you're about to do (one sentence)
- Call the tool in the same response
- Report the result

This applies to:
- File reads/writes
- Git operations (push, pull, commit)
- Any tool call

## Execution Pattern

1. **State intent** (one sentence): "Building two SEO pages and updating sitemap."
2. **Call tool(s)** immediately
3. **Report result** briefly

Example:
```
Building the SEO pages now.

<tool call here>

Done — pushed to branch.
```

## Branch Convention

- Default branch for development: `claude/access-efterplan-folder-TJfJn`
- Always commit with message format:
  ```
  Short summary (T-number if applicable)
  
  - Bullet point details
  - What changed and why
  
  https://claude.ai/code/session_<session_id>
  ```

## Quality Standards

- No comments unless the WHY is non-obvious
- No copy-paste code without unification check
- Test locally when possible before committing
