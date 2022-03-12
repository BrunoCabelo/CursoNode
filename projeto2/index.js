const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection');
//View engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));


//body-parser
app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());


app.get('/', (req, res)=>{
    res.render("index");
});

app.listen(8080, ()=>{
    console.log("servidor rodando");
})