const client = require('../lib/client');
// import our seed data:
const snakes = require('./snakes.js');
// const usersData = require('./users.js');

run();

async function run() {
  await client.connect();
  try {


    // const user = await Promise.all(
    //   usersData.map(user => {
    //     return client.query(`
    //                   INSERT INTO usersData (email, hash)
    //                   VALUES ($1, $2)
    //                   RETURNING *;
    //               `,
    //     [user.email, user.hash]);
    //   })
    // );
      
    // const userTable = user[0].rows[0];

    await Promise.all(
      snakes.map(animal => {
        return client.query(`
                    INSERT INTO snakes (species, spicy_factor, venomous, care_level)
                    VALUES ($1, $2, $3, $4);
                `,
        [animal.species, animal.spicy_factor, animal.venomous, animal.care_level]);
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
