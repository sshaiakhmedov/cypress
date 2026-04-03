---
name: ui-tests
description: Guidelines on how to write Cypress UI tests, best practices, MUST DO, NEVER DO, MANDATORY CHECKLIST, and how to run tests. Use this when writing or running new UI tests.
---

# UI Test Creation Guidelines

## Required Test Coverage Strategy

When asked to write UI tests for a feature, you MUST generate scenarios covering the following:
1. **Happy Path:** Successful completion of the core user flow (e.g., successful login, successful checkout).
2. **Negative Path:** Form validation errors, invalid credentials, or rejecting incorrect inputs.
3. **State Variations:** Empty states, loading states, interactions with disabled buttons, or handled API failures.
4. **Edge/Boundary Cases:** Boundary values in forms or edge navigation paths.

## Guidelines & Rules

*** MUST DO: ***
1. **Create/extend a page object** in `pages/` (or reuse an existing one).
2. **Use TypeScript** for all new tests and Page Objects.
3. Try to use `beforeEach` or `before` hooks if needed for setup.
4. **Use Deep Links!** Do not waste test execution time clicking through the UI just to reach the feature you are testing. Always use direct navigation (`cy.visit(DEEP_URL)`) in `beforeEach` so the test starts directly on the form/UI module being tested. Test UI navigation only when you are explicitly writing a "Navigation" test.
5. Use the browser tool to explore the DOM before writing any locators.
6. Use `.env` file (`Cypress.env()`) for environment variables.
7. Read constants from `constants/` or `data/` folder as per the case.
8. Use Page Objects from `pages/` folder and Components from `components/` folder.
9. If a new spec implies new Page Object, Component, Constant, Data, or Locator, create it in the appropriate folder.
10. **Organize specs by folder:** Place the `.cy.ts` file in a project-specific subdirectory within `cypress/ui/`.
11. **Group related elements:** In Page Objects, if elements relate to one module/block, group them intuitively.

*(Note: For generic anti-patterns like "No locators/constants in specs", refer to the global `AGENTS.md` rules.)*

## Execution Workflow

For the exact step-by-step procedure to execute when creating a new UI test, see:
- Run `/create-ui-test` (located in `.agents/workflows/create-ui-test.md`)

## Example Test

```typescript
import { HomePage } from '../../pages/Home.page';

describe('Home Page', () => {
  const home = new HomePage();

  beforeEach(() => {
    home.goto();
  });

  it('example', () => {
    cy.title().should('match', /Sharp/);
  });
});
```

Prefer **`cy.contains` / user-centric criteria** combined with robust selectors; keep raw CSS as a last resort.
