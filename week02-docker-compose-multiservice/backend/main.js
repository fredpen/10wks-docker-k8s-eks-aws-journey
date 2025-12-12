const express = require('express');
const { setCache, getCache } = require('./Services/CacheService');
const { pgPool } = require('./Services/DatabaseService');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Express Js with Docker is here ddd');
});

app.get('/cache', async (req, res) => {
  const key = 'Visit-times';
  const currentVisit = await getCache(key);
  await setCache(key, Number(currentVisit) + 1);

  res.send(`I have visited the cache page ${Number(currentVisit) + 1}`);
});

app.get('/database', async (req, res) => {
  const db = await pgPool();
  const response = await db.query('SELECT * FROM city');
  res.send(response.rows);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
