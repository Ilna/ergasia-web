const mysql      = require('mysql');
const express = require('express');
var bodyParser = require('body-parser');


const app = express();


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

// connection.connect();


app.put('/', function (req, res) {
    res.json('Hello World Bovo');
  });

app.listen(3000);
