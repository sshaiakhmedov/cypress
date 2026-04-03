---
description: Step-by-step process for adding and running API tests using Cypress
---

# Create API Test Workflow

When adding a new API Spec or test, follow these exact steps:

1. **Pre-requisites Check**:
   - Verify the endpoint requirements and expected status codes.
   - Confirm your required Base URLs or Environment variables are present in your Cypress configs or `.env`.

2. **Data & Config Extraction**:
   - Use `cypress.env()` or `.env` for storing Base URLs, tokens, and API keys.
   - If testing a POST/PUT with a large JSON body, move the payload to a separate file in the `data/` or `fixtures/` folder instead of hardcoding it in the spec.

3. **Reusability Check**:
   - If you are calling the same endpoint across multiple tests, wrap those calls into an API client helper or use Cypress Custom Commands (`cypress/support/commands.ts`).

4. **Write the Test**:
   - Create the `.cy.ts` spec file in the appropriate project folder under `cypress/api/`.
   - Use `cy.request()` to make the API call.
   - Ensure you use correct assertions: e.g., `expect(response.status).to.eq(200)`.

5. **Generate Scenarios**: Ensure you cover:
   - Happy Path (200/201)
   - Negative Path (400 Bad Request)
   - Authentication/Authorization (401/403)
   - Edge/Boundary Cases

6. **Local Run & Verify**:
   - Run `npm run cy:api` or `npx cypress run --spec <path>`.

## MANDATORY VERIFICATION CHECKLIST:
- [ ] Global `AGENTS.md` rules are followed.
- [ ] Request bodies/Complex parameters are extracted to `data/` or `fixtures/`.
- [ ] API endpoints are stored as constants or read from config if they change between environments.
- [ ] Using `expect(response.status).to.eq(...)` or explicitly checking the `isOkStatusCode` before checking the response JSON.
- [ ] Descriptive variable names for parsed body data.
