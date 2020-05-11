require('dotenv').config();

const client = require('./lib/client');

// Initiate database connection
client.connect();

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.get('/api/snakes', async(req, res) => {
  const data = await client.query(`
    SELECT snakes.id, snakes.species, snakes.spicy_factor, snakes.venomous, categories.care_level
    from snakes
    join categories
    on snakes.care_id = categories.id
  `);

  res.json(data.rows);
});

app.get('/api/snakes/:id', async(req, res) => {
  const id = req.params.id;
  const data = await client.query(
    `SELECT snakes.id, snakes.species, snakes.spicy_factor, snakes.venomous, categories.care_level
    from snakes
    join categories
    on snakes.care_id = categories.id
    WHERE id=$1`,
    [id]
  );

 
  res.json(data.rows[0]);
});

app.put('/api/snakes/:id', async(req, res) => {
  const id = req.params.id;
  const newSpecies = req.body.species;
  const data = await client.query(`
  UPDATE snakes 
  SET species=$1
  WHERE id=$2
  returning *;
`, [newSpecies, id]);

  res.json(data.rows);
});

app.delete('/api/snakes/:id', async(req, res) => {
  const id = req.params.id;
  try {
    const data = await client.query(`
    DELETE FROM snakes 
    WHERE id=$1
    returning *;
  `, [id]);

    res.json(data.rows);
  } catch(e) {
    console.error(e);
    res.json(e);
  }
});


app.post('/api/snakes/', async(req, res) => {
  
  try {
    const data = await client.query(`
    INSERT INTO snakes (species, spicy_factor, venomous, care_id)
    VALUES ($1, $2, $3, $4)
    returning *
    `,
    [req.body.species, req.body.spicy_factor, req.body.venomous, req.body.care_id]);

    res.json(data.rows[0]);

    res.json(data.rows);
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
