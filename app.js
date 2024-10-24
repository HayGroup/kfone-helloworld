
const express = require('express');
const { Client } = require('pg');

const app = express();

const conString = "pg://kfmerge_admin:UateMistuTcH@usedpgsqlpayadb01.postgres.database.azure.com:5432/clientdataintake?sslmode=strict";

function connectToPostgres(conString) {
    const client = new Client({
        connectionString: conString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect(err => {
        if (err) {
            console.error('Connection error', err.stack);
        } else {
            console.log('Connected to the database');
        }
    });

    return client;
}

app.get('/', async (req, res) => {
    const client = connectToPostgres(conString);

    try {
        const result = await client.query('SELECT NOW()');
        res.send(`Database time: ${result.rows[0].now}`);
    } catch (err) {
        console.error('Query error', err.stack);
        res.status(500).send('Error querying the database');
    } finally {
        client.end();
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});