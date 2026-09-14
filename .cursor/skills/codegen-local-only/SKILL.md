---
name: codegen-local-only
description: >-
  Phytoseal rule that .codegen must never be committed or pushed to GitHub.
  Use when copying the scaffold, running zero-codegen, editing .gitignore,
  or when git status shows .codegen files.
---

# Codegen is local-only

`.codegen` must never be committed or pushed to GitHub.

- Copy the toolchain from `/Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen` into this repo when needed. Do not move or delete anything in the original scaffold.
- After copy, run `pnpm codegen:paths`.
- `.gitignore` already lists `.codegen/`, `codegen/`, and `**/zero_codegen/`.
- If those paths appear in `git status`, unstage them. Never `git add -f` them.
