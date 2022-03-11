const { Sequelize } = require('sequelize');
const Squelize = require('sequelize');

const conection = new Sequelize('guiaperguntas','root','123456',{
    port: 3336,
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conection;