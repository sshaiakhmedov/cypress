---
name: api-tests
description: Guidelines on how to write API tests using Cypress's cy.request command. Use this when adding or updating API test specs to ensure correctness and maintainability.
---

# API Test Creation Guidelines

## Overview

Cypress provides the `cy.request()` command for making HTTP requests. This is ideal for testing REST APIs.

## Required Test Coverage Strategy

When asked to write API tests for an endpoint, you MUST generate scenarios covering the following:
1. **Happy Path:** Valid request returns `200/201` and the correct data schema.
2. **Negative Path:** Invalid data returns `400` Bad Request.
3. **Authentication:** Missing or invalid tokens returns `401` or `403`.
4. **Edge/Boundary Cases:** Max length strings, empty datasets, etc.

## Guidelines & Rules

*** MUST DO: ***
1. **Use `cy.request()`** for all API interactions.
2. **Extract Payloads/Data:** Move large JSON bodies to files in the `data/` folder.
3. **Environment Variables:** Use `Cypress.env()` and the `.env` file for base URLs and secrets.
4. **Assertions:** Use `should` or `expect` (e.g., `response.status.should('eq', 200)`).
5. **Organize tests by folder:** Place the spec file in a project-specific subdirectory within `cypress/api/`.

## Execution Workflow

For the procedure to execute when creating an API test, see:
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
