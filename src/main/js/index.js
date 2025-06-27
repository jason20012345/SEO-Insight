const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'SEO Insight API is running.' });
});

app.listen(PORT, () => {
  console.log(`SEO Insight API server running on port ${PORT}`);
}); 