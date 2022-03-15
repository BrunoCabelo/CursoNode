const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection');

const catergoriesController = require('./categories/CatergoriesController');
const articlesController = require('./articles/ArticlesController');

//Modules
const Article = require('./articles/Article');
const Category = require('./categories/Category');

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

//Controlers
app.use('/', catergoriesController);
app.use('/', articlesController);


app.get('/', (req, res)=>{
    Article.findAll({
        limit: 4,
        include: [{model: Category}],
        order: [['id', 'DESC']]
    }).then(articles =>{
        Category.findAll().then(categories => {
            res.render("index",{
                articles: articles,
                categories: categories
            });
        })
    })
});

app.get('/:slug', (req,res)=>{
    var slug = req.params.slug;
    Article.findOne({where:{
        slug: slug
    }}).then(article => {
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render('article',{
                    article: article,
                    categories: categories
                });
            })
        }else{
            res.redirect('/');
        };
    }).catch( err => {
        res.redirect('/');
    });
});

app.get('/category/:slug', (req,res)=>{
    var slug = req.params.slug;
    if(slug != undefined){
        Category.findOne({
            where: {slug: slug},
            include: [{model: Article}]
        }).then( category => {
            if(category != undefined){
                Category.findAll().then(categories => {
                    res.render('category', {
                        articles: category.articles,
                        category: category,
                        categories: categories
                    });
                })
                
            }else{
                res.redirect('/')        
            }
        })
    }else{
        res.redirect('/')
    }
    
});

app.listen(8080, ()=>{
    console.log("servidor rodando");
})