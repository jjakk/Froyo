const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('<h1>Froyo</h1><h2>A non-addictive social media platform</h2>');
});
