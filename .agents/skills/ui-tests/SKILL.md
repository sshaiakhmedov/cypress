---
name: ui-tests
description: Guidelines on how to write Cypress UI tests, best practices, MUST DO, NEVER DO, MANDATORY CHECKLIST, and how to run tests. Use this when writing or running new UI tests.
---

# UI Test Creation Guidelines

## Required Test Coverage Strategy

When asked to write UI tests for a feature, you MUST generate scenarios covering the following:
1. **Happy Path:** Successful completion of the core user flow.
2. **Negative Path:** Form validation errors, invalid credentials, or rejecting incorrect inputs.
3. **State Variations:** Empty states, loading states, interactions with disabled buttons.
4. **Edge/Boundary Cases:** Boundary values in forms or edge navigation paths.

## Guidelines & Rules

*** MUST DO: ***
1. **Create/extend a page object** in `pages/` (or reuse an existing one).
2. **Use TypeScript** for all new tests and locators.
3. Use `beforeEach` hooks for setup (e.g., `cy.visit`).
4. Use the browser tool to explore the DOM before writing any locators.
5. Use Page Objects from `pages/` folder and Components from `components/` folder.
6. **Organize specs by folder:** Place the `.cy.ts` file in a project-specific subdirectory within `cypress/e2e/`.

## Execution Workflow

For the procedure to execute when creating a new UI test, see:
- Run `/create-ui-test` (located in `.agents/workflows/create-ui-test.md`)

## Example Test

```typescript
import { HomePage } from '../../pages/Home.page';

describe('Home Page', () => {
  const home = new HomePage();

  beforeEach(() => {
    home.goto();
  });

  it('should have correct title', () => {
    cy.title().should('match', /Sharp/);
  });
});
```

Prefer **`cy.contains` / user-centric criteria** combined with robust selectors; keep raw CSS as a last resort.
