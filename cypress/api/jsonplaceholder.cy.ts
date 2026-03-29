import { Post } from '../support/api.types';

describe('API Testing Demo - JSONPlaceholder (TS)', () => {
  const baseUrl: string = 'https://jsonplaceholder.typicode.com';

  it('POST - Create a new post and validate response', () => {
    // We pass the interface <Post> to cy.request for type safety
    cy.request<Post>({
      method: 'POST',
      url: `${baseUrl}/posts`,
      body: {
        title: 'Cypress API Testing with TS',
        body: 'Type safety makes testing better.',
        userId: 1,
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      // response.body is now typed as Post
      const { body, status, headers, duration } = response;

      expect(status).to.eq(201);
      expect(body.title).to.eq('Cypress API Testing with TS');
      expect(body.userId).to.eq(1);
      
      // Checking headers
      expect(headers).to.have.property('content-type', 'application/json; charset=utf-8');

      // Performance assertion
      expect(duration).to.be.lessThan(1000);
    });
  });

  it('GET - Retrieve a list of posts', () => {
    cy.request<Post[]>('GET', `${baseUrl}/posts`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      
      // Since we typed it as Post[], we can safely check properties on items
      if (response.body.length > 0) {
        expect(response.body[0]).to.have.property('id');
      }
    });
  });
});