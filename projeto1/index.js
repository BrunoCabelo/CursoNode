const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conection = require('./database/database');
const Pergunta = require('./database/Pergunta');

//database

conection.authenticate().then(()=> {
    console.log("Conexão feita com o banco de dados");
}).catch((msgError) => {
    console.log(msgError);
})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/', (req,res) => {
    Pergunta.findAll({raw: true}).then(perguntas => {
        console.log(perguntas);

        res.render('index',{
            perguntas: perguntas
        });
    })
    
  
});

app.get('/perguntar', (req, res)=>{
    res.render('perguntar');
});

app.post('/salvarpergunta', (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect('/');
    });
})

app.listen(8080,()=>{console.log("App rodando");});