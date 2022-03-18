const Sequelize = require('sequelize');


const connection = new Sequelize('guiapress', 'root', '123456',{
    port: 3336,
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00', 
    logging: false
});

module.exports = connection;