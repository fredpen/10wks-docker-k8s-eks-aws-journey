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

app.get('/env', async (req, res) => {
  res.send(process.env);
});

app.get('/database', async (req, res) => {
  const db = await pgPool();
  const response = await db.query('SELECT * FROM city ORDER BY id ASC');
  res.send(response.rows);
});

app.get('/insert', async (req, res) => {
  const db = await pgPool();
  await db.query('CREATE TABLE IF NOT EXISTS city (ID SERIAL PRIMARY KEY, name VARCHAR(30))');
  await db.query('INSERT INTO city (name) VALUES ($1)', ['Manchester']);
  res.send('Done');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
