import request from 'supertest';
import app from '@/app';

describe('GET /', () => {
  it('should return Scoutproperties', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Scoutproperties');
  });
});
