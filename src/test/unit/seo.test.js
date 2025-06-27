const request = require('supertest');
const express = require('express');
const seoRouter = require('../../main/js/api/seo');

jest.mock('../../main/js/core/fetchPage', () => jest.fn(() => '<html><title>Test</title><body>keyword keyword</body></html>'));
jest.mock('../../main/js/services/geminiClient', () => jest.fn(() => ({ score: 90, recommendations: ['Test rec'], geminiRaw: {} })));

describe('POST /api/seo', () => {
  let app;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/seo', seoRouter);
  });

  it('returns score and recommendations', async () => {
    const res = await request(app)
      .post('/api/seo')
      .send({ url: 'http://example.com', keyword: 'keyword' });
    expect(res.statusCode).toBe(200);
    expect(res.body.score).toBeDefined();
    expect(res.body.recommendations).toBeDefined();
  });
}); 