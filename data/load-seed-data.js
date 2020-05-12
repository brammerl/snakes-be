const client = require('../lib/client');
// import our seed data:
const snakes = require('./snakes.js');
const categoriesData = require('./categories.js');

run();

async function run() {
  await client.connect();
  try {
    await Promise.all(
      categoriesData.map(careLevel => {
        return client.query(`
          INSERT INTO categories (care_level)
          VALUES ($1)
          `,
        [careLevel.care_level]
        );
      })
    );

    await Promise.all(
      snakes.map(animal => {
        return client.query(`
                    INSERT INTO snakes (species, spicy_factor, venomous, care_id)
                    VALUES ($1, $2, $3, $4);
                `,
        [animal.species, animal.spicy_factor, animal.venomous, animal.care_id]);
      })
    );
    

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
