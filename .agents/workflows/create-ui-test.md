---
description: procedure to create a new UI test
---

1. Explore the target website using the browser tool to identify selectors
2. Create or updated a Page Object in `pages/` using TypeScript
3. Create a new `.cy.ts` file in a project folder within `cypress/e2e/`
4. Use the Page Object in the test file
5. Run the test locally using `npm run cy:run` or `npx cypress run --spec <path>`
6. Run `npm run lint` and fix any issues
7. Notify the user once the test is passing and lint-free
