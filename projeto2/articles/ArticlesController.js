const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const Slugify = require('slugify');
const { default: slugify } = require('slugify');
const adminMiddleware = require('../middlewares/AdminAuth');

router.get('/admin/articles', adminMiddleware, (req, res)=>{
    Article.findAll({
        include: [{model: Category}],
        order: [['id', 'DESC']]
    }).then(articles =>{
        res.render('admin/articles/index',{
            articles : articles
        })
    })
    
});

router.get('/admin/articles/new', adminMiddleware, (req, res)=>{
    Category.findAll().then(categories=>{
        res.render('admin/articles/new',
            {categories: categories}
        );
    })
    
});

router.post('/articles/save', (req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    if(title != undefined && body != undefined && category != undefined ){
        Article.create({
            title: title,
            slug: Slugify(title),
            body: body,
            categoryId: category
        }).then(()=>{
            res.redirect('/admin/articles')
        }).catch((erro)=>{
            console.log(erro);
            res.redirect('/admin/articles/new');
        })
    }else{
        res.redirect('/admin/articles/new');
    }
});

router.post('/articles/delete', (req,res)=>{
    var id = req.body.id;
    Article.destroy({
        where:{
            id: id
        }
    }).then(()=>{
        res.redirect('/admin/articles');
    })
});

router.get('/admin/articles/edit/:id', adminMiddleware, (req,res)=>{
    var id = req.params.id;
    if(id != undefined){
        Article.findByPk(id, {include: [{model: Category}]}).then((article)=>{
            if(article != undefined){
                Category.findAll().then(categories=>{
                    res.render('admin/articles/edit',{article: article, categories: categories});
                })
                
            }else{
                res.redirect('/admin/articles');
            }
            
        });
    }else{
        res.redirect('/admin/articles');
    };
    
});

router.post('/articles/update', (req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.category;
    var id = req.body.id;
   
    Article.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoryId
    },{
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect('/admin/articles');
    })
});

router.get('/articles/page/:num', (req,res) => {
    var page = req.params.num;
    var offset = 0;

    if(isNaN(page) || page == 1){
        offset = 0;
    }else{
        offset = (parseInt(page) - 1) * 4;
    }
    
    
    Article.findAndCountAll({
        order: [['id', 'DESC']],
        limit: 4,
        offset: offset,
        include: [{model: Category}]
    }).then(articles =>{
        var next;
        
        if(offset + 4 >= articles.count){
            next = false;
        }else{
            next = true;
        };
        var result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }
        Category.findAll().then(categories =>{
            res.render('admin/articles/page',{
                result: result,
                categories: categories
            });
        })
        

    })
})
module.exports = router;