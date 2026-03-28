---
description: procedure to create a new API test
---

1. Verify the endpoint requirements and expected status codes
2. Create any necessary JSON payloads in the `data/` folder
3. Create a new `.cy.ts` file in `cypress/e2e/` (optionally in an `api/` subdirectory)
4. Implement the test using `cy.request()`
5. Run the test locally and verify assertions
6. Run `npm run lint` and fix any issues
7. Notify the user once the test is passing and lint-free
