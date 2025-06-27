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
  // Compose a prompt for Gemini, requesting markdown output
  const prompt = `You are an expert SEO auditor. Given the following web page data, provide your response in markdown format with the following structure:

## SEO Score
A single number (0-100) on its own line.

## Recommendations
A bulleted list of 3-5 actionable recommendations to improve SEO.

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
    const markdown = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('Gemini Markdown Response:', markdown); // Debug log
    // Extract score and recommendations from markdown
    const scoreMatch = markdown.match(/## SEO Score\s*([0-9]{1,3})/i);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;
    const recsMatch = markdown.match(/## Recommendations([\s\S]*)/i);
    let recommendations = [];
    if (recsMatch) {
      recommendations = recsMatch[1]
        .split(/\n|\r/)
        .map(line => line.trim())
        .filter(line => line.startsWith('- ') || line.startsWith('* '))
        .map(line => line.replace(/^[-*]\s*/, ''));
    }
    return {
      score,
      recommendations,
      markdown,
      geminiRaw: markdown,
    };
  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message); // Log error
    throw new Error(`Gemini API error: ${err.response?.data?.error?.message || err.message}`);
  }
}

module.exports = analyzeContent;
