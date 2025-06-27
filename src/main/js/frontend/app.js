document.getElementById('seo-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const url = document.getElementById('url').value;
  const keyword = document.getElementById('keyword').value;
  const resultDiv = document.getElementById('result');
  const markdownDiv = document.getElementById('markdown-output');
  resultDiv.innerHTML = 'Analyzing...';
  markdownDiv.innerHTML = '';
  try {
    const res = await fetch('/api/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, keyword }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Unknown error');
    }
    const data = await res.json();
    resultDiv.style.display = 'none';
    // 1. Render the full markdown report
    let html = '';
    if (data.markdown) {
      html += marked.parse(data.markdown);
    }
    // 2. Show the extracted SEO score in a prominent block
    if (typeof data.score === 'number') {
      html += `<div class="score-block">SEO Score: <strong>${data.score}</strong></div>`;
    }
    // 3. Show each recommendation as a visually separated card
    if (Array.isArray(data.recommendations) && data.recommendations.length > 0) {
      const recBlocks = data.recommendations.map(r => `<div class='rec-block'>${marked.parse(r)}</div>`).join('');
      html += `<div class='rec-blocks'>${recBlocks}</div>`;
    }
    markdownDiv.innerHTML = html;
  } catch (err) {
    resultDiv.style.display = '';
    resultDiv.innerHTML = `<span style=\"color: #e11d48;\">Error: ${err.message}</span>`;
    markdownDiv.innerHTML = '';
  }
});
