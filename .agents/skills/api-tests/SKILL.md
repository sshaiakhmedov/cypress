---
name: api-tests
description: Guidelines on how to write API tests using Cypress's cy.request command. Use this when adding or updating API test specs to ensure correctness and maintainability.
---

# API Test Creation Guidelines

## Overview

Cypress provides the `cy.request()` command for making HTTP requests. This is ideal for testing REST APIs. When writing API tests, we want to maintain separation of concerns and reusability.

## Required Test Coverage Strategy

When asked to write API tests for an endpoint, you MUST generate scenarios covering the following:
1. **Happy Path:** Valid request returns `200/201` and the correct data schema.
2. **Negative Path:** Invalid data (e.g., missing required fields, wrong data types) returns `400` Bad Request.
3. **Authentication/Authorization:** Missing, invalid, or expired tokens returns `401` or `403`.
4. **Edge/Boundary Cases:** Max length strings, empty datasets, etc.

## Guidelines & Rules

*** MUST DO: ***
1. **Use `cy.request()`** for all API interactions.
2. **Extract Payloads/Data:** If testing a POST/PUT with a large JSON body, move the payload to a separate file in the `data/` or `fixtures/` folder.
3. **Use API Helpers/Clients:** If you are calling the same endpoint across multiple tests, wrap those calls into an API client helper in `cypress/support/commands.ts` or an `api/` folder.
4. **Environment Variables:** Use `Cypress.env()` and the `.env` file for base URLs and secrets.
5. **Assertions:** Use `should` or `expect` (e.g., `expect(response.status).to.eq(200)`).
6. **Organize tests by folder:** Place the spec file in a project-specific subdirectory within `cypress/api/`.

*** NEVER DO THE FOLLOWING: ***
*(Note: For generic anti-patterns like "No hardcoded credentials", refer to the global `AGENTS.md` rules.)*
1. Never store massive JSON payloads directly inside the `it()` block.
2. Never chain UI interactions in the same test block as a pure API test unless you are specifically testing UI-API boundaries (in which case, it's an E2E test, not an API test).

## Execution Workflow

For the exact step-by-step procedure to execute when creating an API test, see:
- Run `/create-api-test` (located in `.agents/workflows/create-api-test.md`)

## Example Usage

```typescript
it('fetch user data returns 200', () => {
  cy.request(`${Cypress.env('API_BASE_URL')}/users/1`).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('id', 1);
  });
});
```
