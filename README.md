# SEO Insight — Node.js Web-Based SEO Analysis Tool

## Quick Start

1. **Read CLAUDE.md first** — Contains essential rules for Claude Code
2. Follow the pre-task compliance checklist before starting any work
3. Use proper module structure under `src/main/js/`
4. Commit after every completed task

## Overview
SEO Insight is a lightweight, Node.js-based SEO analysis tool that uses Google's Gemini API to generate an SEO score for any website URL. It performs real-time analysis of a webpage's structure, content, and metadata without storing any data. The system is ideal for on-demand audits, CLI-based analysis, or stateless API services.

## Objectives
- Accept a URL as input and return an SEO score in real time
- Use Gemini API to evaluate content quality, semantic structure, and SEO alignment
- Provide detailed, actionable suggestions based on the analysis
- Avoid all use of persistent storage or database systems
- Support integration in serverless or ephemeral environments (e.g. Cloud Functions, CLI tools)

## Key Features
- **Real-Time SEO Scoring**: Use Gemini to evaluate the submitted page's content, tags, structure, and readability, and return a numeric SEO score (0–100).
- **On-Page Analysis**: Extract and audit title tags, meta descriptions, heading structure, image alt texts, and keyword density.
- **Gemini-Powered Content Evaluation**: Analyze how well the page content aligns with the target topic, user intent, and SEO best practices.
- **Stateless Execution**: The tool operates entirely in memory, making it suitable for serverless deployment or local use without configuration.
- **No Database Required**: All analysis and results are processed on the fly with no user or session data stored.

## Tech Stack
- **Node.js with Express.js or Fastify**
- **Web Crawling**: Puppeteer and Cheerio
- **Gemini API**: For content scoring, semantic analysis, and recommendation generation
- **Output Format**: JSON response or downloadable report (optional)

## Target Users
- Developers building custom SEO tools
- Marketers who need instant, ad-hoc SEO audits
- Command-line users (e.g. `npx seo-score https://example.com`)
- Serverless function environments (Cloudflare Workers, Vercel, AWS Lambda)

## Deliverables
- Node.js command-line tool or microservice
- Gemini-powered SEO scoring logic
- On-the-fly HTML parsing and score breakdown
- No database, no state — stateless and lightweight

## Example Workflow
1. User submits a URL via an HTTP request or CLI input
2. Tool fetches and parses the page with Puppeteer
3. Metadata and content are sent to Gemini for evaluation
4. Gemini returns structured recommendations and a content score
5. System composes a score report and returns it as JSON or printable text

## License
MIT or custom depending on usage context

---

SEO Insight delivers fast, AI-enhanced SEO scoring without complexity. No database, no storage — just pure analysis on demand. 

GEMINI_API_KEY=your-gemini-api-key-here 