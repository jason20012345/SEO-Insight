require('dotenv').config();
const express = require('express');
const app = express();
const seoRouter = require('./api/seo');

const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(express.json());
app.use('/api/seo', seoRouter);

app.listen(PORT, () => {
  console.log(`SEO Insight API server running on port ${PORT} (POST /api/seo)`);
});
