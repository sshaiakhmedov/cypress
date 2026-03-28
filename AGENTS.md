# Cypress Repository Global AI Rules

These rules apply globally to ALL tasks (UI tests, API tests, fixing bugs, writing page objects, etc.) within this repository. You MUST follow them at all times.

## 1. Strict Anti-Patterns (NEVER DO)
- **NO LOCATORS in spec files:** Locators must be in Page Objects (`pages/`) or Components (`components/`).
- **NO DATA/CONSTANTS in spec files:** Extract test data, URLs, usernames, and string constants to the `data/` or `constants/` directories.
- **NO ENVIRONMENT VARIABLES directly in spec files:** Read `Cypress.env()` variables in `constants/` or `data/` files instead.
- **NO HARDCODED SENSITIVE INFO:** Never hardcode tokens, passwords, or credentials anywhere.
- **NO `it.only` OR `it.skip`:** Ensure `it.only` or `it.skip` (or `describe.only`) is removed before finalizing tasks or committing.
- **NO HARDCODED WAITS:** Never use `cy.wait(number)` in tests. Use `cy.intercept` and `cy.wait(alias)` instead.

## 2. Architecture & Patterns (MUST DO)
- **Page Object Model:** All pages must be placed in `pages/` and follow a consistent class-based structure.
- **DRY UI Components:** Use components from `components/` when the same UI appears on 2+ pages.
- **Environment config:** Use `cypress.config.ts` and the `.env` file for storing Base URLs, tokens, and API keys.
- **TypeScript First:** All new files, helpers, and tests MUST be written in TypeScript (`.ts`).
- **Project-Based Folders:** Organize all test specs into subdirectories within `cypress/e2e/` (e.g., `cypress/e2e/sharp/`).

### Page Objects (TypeScript)

**Pattern**
- Use getters for locators and instance methods for actions.

```typescript
export class HomePage {
  get findADoctorButton() {
    return cy.get('#homepage-hero').contains('Find a doctor');
  }

  goto() {
    cy.visit('/');
  }
}
```

**Using in tests**
Instantiate the page object within the `beforeEach` or at the top of the `it` block.

```typescript
import { HomePage } from '../../pages/Home.page';

const home = new HomePage();

it('hero button is visible', () => {
  home.goto();
  home.findADoctorButton.should('be.visible');
});
```

### Reusable Components (DRY UI)

Use components when **the same UI appears on 2+ pages** (e.g. login, header, footer).

**Creating a component**
- Location: `components/` (e.g. `components/Header.component.ts`).

```typescript
export class HeaderComponent {
  get logo() {
    return cy.get('header img.logo');
  }

  get findADoctorLink() {
    return cy.get('header').contains('Find a Doctor');
  }
}
```

**Using a component in a page object**

```typescript
import { HeaderComponent } from '../components/Header.component';

export class BasePage {
  header = new HeaderComponent();
}
```

**When to Refactor into a Component**
Create a component in `components/` when:
- The same block of UI (same selectors + behaviors) appears in more than one page object.
- You are about to copy-paste selectors/actions between page objects.

---
*For specific task guidelines, refer to the individual `SKILL.md` files in the `.agents/skills/` directory (e.g., `ui-tests`, `api-tests`, `git-commit`).*
