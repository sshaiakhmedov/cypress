---
description: How to stage, commit, push changes, and check GitHub Actions CI status with autofix
---

# Git Commit and Autofix Workflow

When committing code, follow these steps exactly:

1. **Verify Tests Pass**: Run local tests for the modified files (e.g., `npm run cy:ui` or `npm run cy:api`).
2. **Review Changes**: Run `git status` and `git diff` to ensure no locators, credentials, or `.only` blocks are left.
3. **Stage Specific Files**: Run `git add <file>` to stage specific files. Avoid `git add .` unless fully confident.
4. **Commit**: Run `git commit -m "Your precise message"` with an imperative summary (<= 50 chars).
5. **Push**: Run `git push`.
6. **Check CI Status**:
    Run `gh run list --limit 1` to get the latest run status.
    If pending/running, wait using `gh run watch`.
7. **Autofix Failures**:
    If the run fails, get the run ID and view logs using `gh run view <RUN_ID> --log-failed`.
    Autofix the issue, re-commit, and push again.

## MANDATORY CHECKLIST BEFORE PUSHING:
- [ ] The test runs successfully locally.
- [ ] Global `AGENTS.md` rules are followed (no `it.only`, no `cy.wait(<number>)`, etc.).
- [ ] The commit message accurately reflects the changes.
- [ ] The commit is pushed to the remote repository.
- [ ] GitHub Actions status is checked, and any failures are autofixed.
