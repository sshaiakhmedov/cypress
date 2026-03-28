---
description: procedure to run after testing to commit changes and monitor CI
---

1. Stage all relevant files (tests, page objects, components, configs)
2. Commit with a clear, descriptive message (e.g., "feat: add UI tests for sharp virtual care")
3. Push to the remote repository
4. Monitor the GitHub Actions workflow status
5. If the CI fails, analyze logs, apply autofixes, and re-commit/push until green
