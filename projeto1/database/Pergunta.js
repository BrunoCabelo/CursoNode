const Sequelize = require('sequelize');
const conection = require('./database');

const Pergunta = conection.define('pergunta', {
    titulo:{
        type: Sequelize.STRING,
        alolowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        alolowNull: false
    }
});

Pergunta.sync({force: false}).then(()=>{
    console.log('Tabela criada');
});

module.exports = Pergunta;