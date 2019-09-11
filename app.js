var http = require('http');
const express = require('express');
const port = (process.env.PORT || 8080);

// App
var app = module.exports = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

const mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "tshirts",
    table: "tshirts"
});

con.connect();

app.get('/', function(req, res){ 
    res.render('T-shirts-table') 
})

app.post('/api/submitTshirt', (req, res) => {
    var input = req.body;
    var sql = `INSERT INTO tshirts (firstName, lastName, type, size, color) VALUES ("${input.firstName}","${input.lastName}", "${input.type}", "${input.size}", "${input.color}")`;
    con.query(sql);
    res.send({"very":"successfull"})
});
app.post('/api/editTshirt', (req, res) => {
    var input = req.body;
    var sql = `UPDATE tshirts SET firstName="${input.firstName}", lastName = "${input.lastName}", type =  "${input.type}", size="${input.size}",color= "${input.color}" WHERE id=${input.id}`;
    con.query(sql);
    res.send({"very":"successfull"})
});
app.post('/api/deleteTshirt', (req, res) => {
    // Delete(req.body);
    console.log(req.body);
    console.log("@@@@@@");
    var input = req.body.id;
    console.log(input);
    var sql = `DELETE FROM tshirts WHERE id=${input};`;
    con.query(sql);
    res.send({"very":"successfull"})
});

app.post('/api/changeTshirt', (req, res) => {
    // Delete(req.body);
    
    var input = req.body.id;
    console.log(input);
    var sql = `DELETE FROM tshirts WHERE id=${input};`;
    con.query(sql);
    res.send({"very":"successfull"})
});

app.get("/T-shirts-table", function(req, res){
    res.render("T-shirts-table");
})

app.get("/T-shirts-submit", function(req, res){
    res.render("T-shirts-submit");
})

app.get("/T-shirt-edit", function(req, res){
    var info = {};
    info.id = req.query.id;
    info.firstname = req.query.firstname;
    info.lastname = req.query.lastname;
    info.type = req.query.type;
    info.color = req.query.color;
    info.size = req.query.size;

    console.log(info);

    res.render("T-shirts-edit", {info: info});
})

app.get('/api/getTshirts', (req, res) => {
    selelct((result) => {
        // console.log(result);
        res.send({ tshirts: result });
    })
});


function selelct(cb) {
    var sql = `SELECT * FROM tshirts`;
    con.query(sql, (err, result, fields) => {
        console.log(err);
        if (err) throw err;
        cb(result);
        //console.log(result);
    });
    //con.end();
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
