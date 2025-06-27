const axios = require('axios');

// eslint-disable-next-line no-undef
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY not set in environment');
}

async function analyzeContent({
  title,
  metaDescription,
  headings,
  images,
  keywordDensity,
  bodyText,
}) {
  // Compose a prompt for Gemini
  const prompt = `You are an expert SEO auditor. Given the following web page data, provide:
- An SEO score (0-100)
- 3-5 actionable recommendations to improve SEO

Page Data:
Title: ${title}
Meta Description: ${metaDescription}
Headings: ${headings.map(h => `${h.tag}: ${h.text}`).join(' | ')}
Images: ${images.map(img => `alt: ${img.alt}`).join(' | ')}
Keyword Density: ${keywordDensity ? keywordDensity.toFixed(2) : 'N/A'}%
Body Text: ${bodyText.slice(0, 1000)}...`;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      },
      {
        headers: { 'Content-Type': 'application/json' },
        params: { key: apiKey },
        timeout: 20000,
      }
    );
    // Parse Gemini's response
    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // Try to extract score and recommendations from the text
    const scoreMatch = text.match(/score\s*[:\-]?\s*(\d{1,3})/i);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;
    const recsMatch = text.match(/recommendations?\s*[:\-]?([\s\S]*)/i);
    let recommendations = [];
    if (recsMatch) {
      recommendations = recsMatch[1]
        .split(/\n|\d+\.|\*/)
        .map(r => r.trim())
        .filter(r => r.length > 0 && !/^score/i.test(r));
    }
    return {
      score,
      recommendations,
      geminiRaw: text,
    };
  } catch (err) {
    throw new Error(`Gemini API error: ${err.response?.data?.error?.message || err.message}`);
  }
}

module.exports = analyzeContent;
