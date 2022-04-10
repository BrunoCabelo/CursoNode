const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const jwtsecreet = 'as12d24pt0-123';


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


function auth(req, res, next){
 
    const authToken = req.headers['authorization'];

    if(authToken != undefined){

        const bearer = authToken.split(' ');
        const token = bearer[1];
        
        jwt.verify(token, jwtsecreet,(err, data) => {
            if(err){
                res.status(401);
                res.json({err: 'Token invalido'});
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        });
    }else{
        res.status(401);
        res.json({err: 'Token invalido'});
    }
}

var DB = {
    games : [
        {
            "id": 0,
            "title": "Red Dead Redenption 1",
            "year": "2015",
            "price": 150
        },
        {
            "id": 13,
            "title": "Sea of Thieves",
            "year": "2018",
            "price": 250
        },
        {
            "id": 64,
            "title": "Minecraft",
            "year": "2015",
            "price": 54
        },
        {
            "id": 200,
            "title": "CS:GO",
            "year": "2016",
            "price": 79
        },
        {
            "id": 201,
            "title": "Crash",
            "year": "1999",
            "price": 25
        }
    ],
    users: [
        {
            id: 1,
            name: 'José',
            email: 'jose@jose',
            password: '1234'
        },{
            id: 2,
            name: 'Victor',
            email: 'victor@victor',
            password: 'java123'
        }
    ]
}


app.get('/games', auth ,(req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get('/game/:id', (req,res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        id = parseInt(id);
        
        var game = DB.games.find(g => g.id == id); 
        if(game == undefined){
            res.sendStatus(404);
        }else{
            res.statusCode = 200;
            res.json(game);
        }


    }
});

app.post('/game', auth , (req,res) => {
    
    var title = req.body.title;
    var year = req.body.year;
    var price = req.body.price;

    if(title == undefined || year == undefined || price == undefined){
        res.sendStatus(400);
    }else{
        DB.games.push({
            id:200,
            title,
            year,
            price
        });
        res.sendStatus(200);
    }

});

app.delete('/game/:id', auth , (req,res) => {
    var id = req.params.id;
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        id = parseInt(id);
        var index = DB.games.findIndex(g => g.id == id);
        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }
});

app.put('/game/:id', auth , (req,res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        id = parseInt(id);
        
        var game = DB.games.find(g => g.id == id); 
        if(game == undefined){
            res.sendStatus(404);
        }else{
            var title = req.body.title;
            var year = req.body.year;
            var price = req.body.price;

            if(title != undefined){
                game.title = title;
            }
            if(year != undefined){
                game.year = year;
            }
            if(price != undefined){
                game.price = price;
            }
            res.sendStatus(200);
        }


    }
});

app.post('/auth', (req, res) =>{
    var {email, password} = req.body;
    if(email != undefined){

        var user = DB.users.find(u => u.email == email);
        if(user != undefined){
            
            if(user.password == password){
                var token = jwt.sign({id: user.id, email: user.email, name: user.name}, jwtsecreet,{expiresIn: '24h'}, (err, token) => {
                    if(err){
                        res.status(400),
                        res.json({err: 'falha interna'});
                    }else{
                        res.status(200);
                        res.json({token: token})
                    }
                });
            }else{
                res.status(401);
                res.json({err: 'Credenciais invalidas'});
            }

        }else{
            res.status(404);
            res.json({err: 'O email enviado não existe'});
        }

    }else{
        res.status(400);
        res.json({err: 'O email é invalido'});
    }
})

app.listen(8080,() =>{
    console.log('server api iniciado');
})