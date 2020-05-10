require('dotenv').config();

const client = require('./lib/client');

// Initiate database connection
client.connect();

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.get('/api/snakes', async(req, res) => {
  const data = await client.query('select * from snakes');

  res.json(data.rows);
});


app.post('/api/snakes/', async(req, res) => {
  
  try {
    const data = await client.query(`
    INSERT INTO snakes (species, spicy_factor, venomous, care_level)
    VALUES ($1, $2, $3, $4)
    returning *
    `,
    [req.body.species, req.body.spicy_factor, req.body.venomous, req.body.care_level]);

    res.json(data.rows[0]);
  } catch(e) {
    console.error(e);
    res.json(e);
  }

});


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

module.exports = app;
