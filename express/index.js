const express = require("express");  //Importando express
const app = express(); //Iniciando express

app.get("/",(req, res)=>{
    res.send("Bem vindo ao site!");
});

app.get("/blog/:artigo?",(req, res)=>{
   
    var artigo = req.params.artigo;
    if(artigo){
        res.send("Bem vindo ao artigo " + artigo);    
    }else{
        res.send("Bem vindo ao blog");    
    }
    
});

app.get("/canal/youtube",(req, res)=>{
    var canal = req.query["canal"];
    var tv = req.query["tv"];

    if(canal){
        res.send("Bem vindo ao canal " + canal + " na tv: " + tv);
    }else{
        res.send("Nenhum canal fornecido!");
    }
    
});

app.get("/ola/:nome/:empresa", (req, res)=>{
    var nome = req.params.nome;
    var empresa = req.params.empresa;
    res.send("olá " + nome + " da empresa " + empresa);
});

app.listen(4000, (erro)=>{
    if(erro) {
        console.log("Ocorreu um erro!");
    }else {
        console.log("Servidor iniciado com sucesso!");
    }

}) 