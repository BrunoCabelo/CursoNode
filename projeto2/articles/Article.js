const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Category = require('../categories/Category');

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Article);  //Tem muitos
Article.belongsTo(Category); //Pertence a um
Article.sync({force: false});

module.exports = Article;