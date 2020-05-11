const client = require('../lib/client');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE categories (
                  id SERIAL PRIMARY KEY NOT NULL,
                  care_level VARCHAR(512) NOT NULL
                );
                CREATE TABLE snakes (
                    id SERIAL PRIMARY KEY NOT NULL,
                    species VARCHAR(512) NOT NULL,
                    spicy_factor INTEGER NOT NULL,
                    venomous BOOLEAN NOT NULL,
                    care_id INTEGER NOT NULL REFERENCES categories(id)
            );
        `);

    console.log('create tables complete');
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
