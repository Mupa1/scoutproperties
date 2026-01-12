import request from 'supertest';

jest.mock('../src/lib/prisma', () => ({
  prisma: {
    user: {},
    listing: {},
    listingDetails: {},
    $disconnect: jest.fn(),
  },
}));

import app from '../src/app';

describe('GET /', () => {
  it('should return Scoutproperties', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Scoutproperties API');
  });
});
