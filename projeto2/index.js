const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection');

const catergoriesController = require('./categories/CatergoriesController');
const articlesController = require('./articles/ArticlesController');

//View engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

// Database
connection.authenticate().then(()=>{
    console.log("Conexão feita com sucesso!");
}).catch((erro)=>{
    console.log(erro);
})

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/', catergoriesController);
app.use('/', articlesController);


app.get('/', (req, res)=>{
    res.render("index");
});

app.listen(8080, ()=>{
    console.log("servidor rodando");
})