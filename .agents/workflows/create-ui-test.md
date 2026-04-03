---
description: Step-by-step process for writing and running a Cypress UI test
---

# Create UI Test Workflow

When writing a new UI Spec or test, follow these exact steps:

1. **Explore the DOM**:
   - Use the browser tool to explore the DOM and find robust selectors before writing them.
   - Prefer `cy.contains` combined with robust selectors or data attributes.

2. **Setup Architecture**:
   - Check if the page exists in `pages/`. Provide a new or extend an existing Page Object.
   - Check if a `components/` object is needed for shared UI.
   - Check if `constants/` or `data/` should be created/updated.

3. **Write the Test**:
   - Create the `.cy.ts` file in the appropriate project folder under `cypress/ui/`.
   - Instantiate your Page Objects at the top of your `describe` block or in a `beforeEach`.
   - Use `.env` file and `Cypress.env()` if configuration is needed.

4. **Generate Scenarios based on UI Module Type**:
   - You MUST read the `.agents/skills/ui-tests/standard-scenarios.md` file FIRST. 
   - Identify the correct UI Module Type (Form, Search, Navigation, etc.) and generate the strict, standardized combinations of Happy, Negative, and Edge case scenarios listed in that file.

5. **Local Run**:
   - Look at `package.json` scripts.
   - Run in headful mode using `cypress open` or headless mode using `cypress run` (`npm run cy:ui`).

6. **AI Code Review (MANDATORY)**:
   - BEFORE completing the workflow, you MUST review the `.cy.ts` code you just wrote.
   - If the strings `cy.get`, `cy.contains`, or `cy.find` exist **ANYWHERE** inside the `.cy.ts` file (outside of `beforeEach` validation or simple waits), you have likely violated the Page Object Model rule.
   - **Self-Correct:** You MUST pause, refactor those raw locators back into the `pages/` or `components/` objects, and replace them with standard getter/method calls in the spec before presenting the code to the user.

## MANDATORY VERIFICATION CHECKLIST:
- [ ] Global `AGENTS.md` rules are followed (No locators, data, or env vars directly in specs; Page Objects and Components used correctly).
- [ ] Prioritizing `cy.contains()` or specific data attributes over raw CSS classes.
- [ ] No `it.only` or `describe.only` blocks are left in the spec.
- [ ] No `cy.wait(<number>)` statements are used.
- [ ] No `cy.viewport()` statements in the spec unless explicitly writing a mobile layout test.
- [ ] NO raw locators (e.g. `cy.get('.classname')`) in the `.cy.ts` test block. ALL locators MUST be encapsulated within Page Objects or Components.
