const request = require('supertest');

const app = require('../src/server/app');

describe('Testing routes that render Pug templates', () => {
  it('Landing page should return 404 as it is not implemented yet', async (done) => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
    done();
  });
});
