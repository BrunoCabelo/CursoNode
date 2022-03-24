const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
    ]
}


app.get('/games', (req, res) => {
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

app.post('/game', (req,res) => {

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

app.delete('/game/:id', (req,res) => {
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

app.put('/game/:id', (req,res) => {
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

app.listen(8080,() =>{
    console.log('server api iniciado');
})