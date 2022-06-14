const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const expressFlash = require('express-flash');
const cookieParser = require('cookie-parser');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'segredo da session 12345',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

app.use(cookieParser('senha'));
app.use(expressFlash());

app.get('/', (req, res) => {
    var emailError  = req.flash('emailError');
    var nomeError   = req.flash('nomeError');
    var pontosError = req.flash('pontosError');
    var email       = req.flash('email');
    var nome        = req.flash('nome');
    var pontos      = req.flash('pontos');

    emailError  = (emailError == undefined || emailError.length == 0)   ? undefined : emailError;
    nomeError   = (nomeError == undefined || nomeError.length == 0)     ? undefined : nomeError;
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError; 

    res.render('index', {emailError, nomeError, pontosError, email, nome, pontos});
});

app.post('/form', (req, res) => {
    var {email, nome, pontos} = req.body;

    var emailError;
    var nomeError;
    var pontosError;

    if(email == undefined || email == ''){
        emailError = 'O email não pode ser vazio';
    }

    if(nome == undefined || nome == ''){
        nomeError = 'O nome não pode ser vazio'    
    }

    if(pontos == undefined || pontos < 20){
        pontosError = 'Você não pode ter menos do que 20 pontos';
    }
    
    if(emailError != undefined || nomeError != undefined || pontosError != undefined){
        req.flash('emailError', emailError);
        req.flash('nomeError', nomeError);
        req.flash('pontosError', pontosError);
        req.flash('pontos', pontos);
        req.flash('email', email);
        req.flash('nome', nome);
        res.redirect('/');

    }else{
        res.send('Validado');
    }
    res.send(email);
})

app.listen(8080,(req, res) => {
    console.log("Sevidor rodando!");
})