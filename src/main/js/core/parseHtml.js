const cheerio = require('cheerio');

function parseHtml(html, keyword = '') {
  const $ = cheerio.load(html);
  const title = $('title').text();
  const metaDescription = $('meta[name="description"]').attr('content') || '';
  const headings = [];
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((tag) => {
    $(tag).each((_, el) => headings.push({ tag, text: $(el).text() }));
  });
  const images = [];
  $('img').each((_, el) => {
    images.push({ src: $(el).attr('src'), alt: $(el).attr('alt') || '' });
  });
  // Placeholder for keyword density
  const keywordDensity = keyword
    ? (($('body').text().toLowerCase().split(keyword.toLowerCase()).length -
        1) /
        $('body').text().split(' ').length) *
      100
    : null;

  return {
    title,
    metaDescription,
    headings,
    images,
    keywordDensity,
  };
}

module.exports = parseHtml;
