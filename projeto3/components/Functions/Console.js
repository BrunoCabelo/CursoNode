const readline = require('readline');

var prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function Console(){
    return new Promise((resolve, reject) => {
        
        console.log(`
            --------------Bem vindo ao conversor CSV--------------
            ------------------------------------------------------
            ----------------------Instruções----------------------
            
            1) Insira o arquivo '.csv' dentro da pasta 'arquivos'
            2) Informe o nome do arquivo sem erros! 
            PS) Qualquer erro no nome do arquivo ira resultar em
            mal funcionamento do sistema!
            3) Aguarde a mensagem de arquivos gerados!
            
                                    FIM
            ------------------------------------------------------
        `)
        
        prompt.question('Insira o nome do arquivo com o final ".csv": \n', (ans) => {
            if(ans == ''){
                console.log('infome um nome válido');
            }else{
                resolve(ans);
                prompt.close();
            }
        })
    })
}

module.exports = Console;