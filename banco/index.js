var database = require('./database');

var dados = [
    {
        nome: 'Red Dead Redenption 1',
        preco: 94.00
    },
    {
        nome: 'Call of Duty - War zone',
        preco: 65.50
    },
    {
        nome: 'Minecraft - Story mode',
        preco: 60.00
    },
    {
        nome: 'Sea of Thieves - Gold Edition',
        preco: 155.00
    }
]

/* Insert */
/* database.insert(dados).into('games').then(data => {
    console.log('Sucesso')
}).catch(err => {
    console.log('Erro' + err);
}); */

/* Select */
/* database.select(['id', 'nome']).table('games').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
})
 */

database.select().whereRaw('preco > 100.00').table('games').then(data => {
    console.log(data);
}).catch(err => {
    console.log('Erro: ' + err)
})
