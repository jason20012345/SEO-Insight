const express = require('express');
const fetchPage = require('../core/fetchPage');
const parseHtml = require('../core/parseHtml');
const analyzeContent = require('../services/geminiClient');

const router = express.Router();

router.post('/', async (req, res) => {
  const { url, keyword } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'Missing url' });
  }
  try {
    const html = await fetchPage(url);
    const parsed = parseHtml(html, keyword);
    parsed.bodyText = html.replace(/<[^>]+>/g, ' '); // crude body text extraction
    const geminiResult = await analyzeContent(parsed);
    res.json({
      url,
      score: geminiResult.score,
      recommendations: geminiResult.recommendations,
      details: geminiResult.geminiRaw,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
