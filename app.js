const express = require('express');
const PORT = 5000;

const articles = require('./articles.json');
const app = express();
app.use(express.json());

app.get('/', (req, res) =>
{
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(articles));
    
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))