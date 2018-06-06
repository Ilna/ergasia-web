

const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');



const app = express();
app.use(express.static('./'));

app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(app.router);

const conn = mysql.createConnection({
    host: '35.204.206.195',
    user: 'root',
    password: 'password',
    database: 'ilia_tests',
    credentials: true
});

conn.connect();

//dwse ola ta vivlia
app.get('/books', function (req, res) {

    let sql = "SELECT * FROM books";
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
    })

})

app.get('/books/:title', function (req, res) {

    let sql = "SELECT * FROM books WHERE title=?";
    conn.query(sql, [req.params.title], function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);
    })

})

app.post('/books/:author/:title/:genre/:price', function (req, res) {

    var author = req.params.author;
    var title = req.params.title;
    var genre = req.params.genre;
    var price = req.params.price;
    var values = [author,title,genre, price];
    console.log(author+title+genre+price);
    let sql = "INSERT INTO books (author,title,genre,price) VALUES ('Victor Hugo', 'Les Miserables', 'Mystery',30)";
    conn.query(sql, req.params.values, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
        console.log(result);

    })
})

// app.post('/books/',urlencodedParser, function (req, res) {

//     //let values ={author :author, title:title, genre:genre, price:price};
//     let sql = "INSERT INTO books (author, title, genre, price) VALUES ?";
//     conn.query(sql, req.body, function (err, result, fields) {
//         if (err) throw err;
//         res.end(JSON.stringify(req.body));

//     })
// })


// app.post('/books/', function(req, res){

//     var author=req.body.author;
//     var title=req.body.title;
//     var genre=req.body.genre;
//     var price=req.body.price;
//     values= [author, title, genre, price];

//     connection.query("INSERT INTO books SET ?", values.toString(), function(err, result){
//         if(err) throw err;

//         res.end(JSON.stringify(req.body));
//         console.log("1 record inserted");
//     });

// });


app.listen(3000);
