const request = require('supertest');
const app = require('../api/index'); // Por eso exportamos app sin el listen

describe('AUTH API', () => {
  it('Debería fallar si no hay credenciales', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({});
    expect(res.statusCode).toEqual(400);
  });
});