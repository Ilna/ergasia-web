

const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');



const app = express();
app.use(express.static('./'));

app.use(bodyParser.urlencoded({ extended: true }));


const conn = mysql.createConnection({
    host: '35.204.206.195',
    user: 'root',
    password: 'password',
    database: 'ilia_tests',
    credentials: true
});

conn.connect();

//All books
app.get('/books', function (req, res) {

    let sql = "SELECT * FROM books";
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
    })

})

//Find book by title (even if the input is a single letter it finds all books with that letter)
app.get('/books/:title', function (req, res) {

    let title = req.params.title;

    conn.query("SELECT * FROM books WHERE title" + " like '%" + req.params.title + "%'", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
    })

})

//Create a new book
app.post('/books/:author/:title/:genre/:price', function (req, res) {

    let author = req.params.author;
    let title = req.params.title;
    let genre = req.params.genre;
    let price = req.params.price;

    let sql = "INSERT INTO books (author,title,genre,price) VALUES(?,?,?,?)";
    conn.query(sql, [author, title, genre, price], function (err, result, fields) {
        if (err) throw err;
        res.json(result);

    })
})

//Delete book by title
app.post('/books/:title', function (req, res) {


    let sql = "DELETE FROM books WHERE title=?";
    conn.query(sql, [req.params.title], function (err, result, fields) {
        if (err) throw err;
        res.json(result);

    })
})

app.listen(3000);
