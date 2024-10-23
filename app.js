var express = require('express');
var app = express();

var pg = require("pg");

var conString = "pg://kfmerge_admin:UateMistuTcH@usedpgsqlpayadb01.postgres.database.azure.com:5432/clientdataintake";
//var conString = 'pg://kfone_core_user:Ad%2FNJ1GGgtoH_@kfone-dev-use1-shared-psql-001.cnosksgsira5.us-east-1.rds.amazonaws.com:5432/kfone?schema=kfone_core?sslmode=prefer';
var client = new pg.Client(conString);
client.connect();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});