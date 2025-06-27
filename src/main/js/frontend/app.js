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
    if (data.markdown) {
      resultDiv.style.display = 'none';
      markdownDiv.innerHTML = marked.parse(data.markdown);
      // If recommendations are present, show them as blocks below the markdown
      if (Array.isArray(data.recommendations) && data.recommendations.length > 0) {
        const recBlocks = data.recommendations.map(r => `<div class='rec-block'>${marked.parse(r)}</div>`).join('');
        markdownDiv.innerHTML += `<div class='rec-blocks'>${recBlocks}</div>`;
      }
    } else {
      resultDiv.style.display = '';
      resultDiv.innerHTML = `
        <div><strong>SEO Score:</strong> ${data.score ?? 'N/A'}</div>
        <div><strong>Recommendations:</strong><ul>
          ${(data.recommendations || []).map(r => `<li>${r}</li>`).join('')}
        </ul></div>
      `;
    }
  } catch (err) {
    resultDiv.style.display = '';
    resultDiv.innerHTML = `<span style=\"color: #e11d48;\">Error: ${err.message}</span>`;
    markdownDiv.innerHTML = '';
  }
});
