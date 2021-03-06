require('dotenv').config();

const client = require('./lib/client');

// Initiate database connection
client.connect();

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.get('/snakes', async(req, res) => {
  const data = await client.query('select * from snakes');

  res.json(data.rows);
});

app.get('/snakeNames', async(req, res) => {
  const data = await client.query('select species from snakes');

  res.json(data.rows);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

module.exports = app;
