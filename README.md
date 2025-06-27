# SEO Insight — Node.js Web-Based SEO Analysis Tool

## Quick Start

1. Install dependencies: `npm install`
2. Set your Gemini API key in a `.env` file: `GEMINI_API_KEY=your-gemini-api-key-here`
3. Start the server: `npm start`
4. Open [http://localhost:3000/](http://localhost:3000/) in your browser for the web UI
5. Or use the `/api/seo` endpoint for programmatic access

## Features
- **Modern Web UI**: Analyze SEO for any URL with a simple, beautiful browser interface
- **Markdown-Based Reporting**: Results are shown as a full markdown report, with a prominent SEO score and visually separated recommendation cards
- **Real-Time SEO Scoring**: Uses Gemini AI to evaluate content, tags, structure, and readability, returning a numeric SEO score (0–100)
- **On-Page Analysis**: Extracts and audits title tags, meta descriptions, heading structure, image alt texts, and keyword density
- **Stateless Execution**: No database or persistent storage required
- **API Access**: Use the `/api/seo` endpoint for CLI or serverless integration

## Web UI
- Visit [http://localhost:3000/](http://localhost:3000/) after starting the server
- Enter a website URL and (optionally) a keyword
- Click "Analyze" to get a full markdown SEO report, a prominent score, and actionable recommendations as cards

![Web UI Screenshot](docs/user/web-ui-screenshot.png)

## Example Workflow
1. User submits a URL via the web UI or API
2. Tool fetches and parses the page with Puppeteer
3. Metadata and content are sent to Gemini for evaluation
4. Gemini returns a markdown-formatted SEO report, score, and recommendations
5. The system displays the report in the browser or returns JSON via API

## API Usage
POST to `/api/seo` with JSON:
```json
{
  "url": "https://example.com",
  "keyword": "example"
}
```
Response:
```json
{
  "score": 85,
  "recommendations": ["..."],
  "markdown": "...full markdown report..."
}
```

## License
MIT or custom depending on usage context

---

SEO Insight delivers fast, AI-enhanced SEO scoring without complexity. No database, no storage — just pure analysis on demand. 