
const express = require('express');
const { Client } = require('pg');

const app = express();

const conString = "pg://kfmerge_admin:UateMistuTcH@usedpgsqlpayadb01.postgres.database.azure.com:5432/clientdataintake?sslmode=strict";

const connectToPostgres = async (conString) =>{
    const client = new Client({
        connectionString: conString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    // client.connect(err => {
    //     if (err) {
    //         console.error('Connection error', err.stack);
    //     } else {
    //         console.log('Connected to the database');
    //     }
  // });
    await client.connect();

    const res = await client.query('SELECT NOW()')
    console.log(JSON.stringify(res)) // Hello world!
  
  
    // client.connect(err => {
    //     if (err) {
    //         console.error('Connection error', err.stack);
    //     } else {
    //         console.log('Connected to the database');
    //     }
    //   })
    //   .then(() => {
    //     console.log('Connected to the PostgreSQL database successfully.');

    //     // Perform a simple query to check the connection
    //     return client.query('SELECT NOW()');
    //   })
    //   .then(result => {
    //     console.log('Query successful, current time:', result.rows[0].now);

    //     // Perform additional actions (insert, update, select, etc.)
    //     return client.query('SELECT * FROM job LIMIT 10'); // Replace 'your_table' with an actual table name
    //   })
    //   .then(result => {
    //     console.log('Query results:', result.rows);

    //     // Do other database operations here
    //     // Example: Inserting a row
    //   })
    //   .then(() => {
    //     console.log('Row inserted successfully.');

    //     // Perform any other database operations

    //     // Close the client connection
    //     return client.end();
    //   })
    //   .then(() => {
    //     console.log('Client connection closed.');
    //   })
    //   .catch(err => {
    //     console.error('Error connecting to the database or during operations:', err);
    //     client.end(); // Ensure the client connection is closed on error
    //   });

    return client;
}

app.get('/', async (req, res) => {
    const client =await connectToPostgres(conString);

  try {
    console.log('Inside te try block');
        const result = await client.query('SELECT NOW()');
        res.send(`Database time: ${result.rows[0].now}`);
    } catch (err) {
        console.error('Query error', err.stack);
        res.status(500).send('Error querying the database');
  } finally {
    console.log('Inside te finally block');
        await client.end();
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});