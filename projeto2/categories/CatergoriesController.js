const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');
const adminMiddleware = require('../middlewares/AdminAuth');

router.get('/categories', (req, res)=>{
    res.send("Rota de categorias");
});

router.get('/admin/categories/new', adminMiddleware, (req, res)=>{
    res.render('admin/categories/new');
});

router.post('/categories/save', (req,res)=>{
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect('/admin/categories');
        })


    }else{
        res.redirect('admin/categories/new')
    }
});

router.get('/admin/categories',adminMiddleware, (req,res)=>{
    Category.findAll({raw: true}).then(categories =>{
        res.render('admin/categories',{
            categories: categories
        });
    })
    
});

router.post('/categories/delete', (req, res)=>{
    var id = req.body.id;
    if(id != undefined){

        if(!isNaN(id)){

            Category.destroy({
                where:{
                    id : id
                }
            }).then(()=>{
                res.redirect('/admin/categories');    
            })

        }else{
            res.redirect('/admin/categories');
        }

    }else{
        res.redirect('/admin/categories');
    }
});

router.get('/admin/categories/edit/:id', adminMiddleware,(req,res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect('/admin/categories');
    }

    Category.findByPk(id).then(category => {
        if(category != undefined){
            res.render('admin/categories/edit',{
                category: category
            });
        }else{
            res.redirect('/admin/categories');
        }
    }).catch(erro => {
        res.redirect('/admin/categories');
    })
});

router.post('/categories/update', (req,res)=>{
    var title = req.body.title;
    var id = req.body.id;
    
    Category.update({
        title: title,
        slug: slugify(title)
    },{ where:{ id: id }}).then(()=>{
        res.redirect('/admin/categories');
    });
})

module.exports = router;