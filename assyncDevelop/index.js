/* function finalEmail(errorStatus){
    if(errorStatus != undefined){
        console.log(errorStatus);
    }else{
        console.log("Email enviado");
        console.log("Tudo ok");
    }
}

function enviarEmail(corpo, para, callback){
    setTimeout(() => {
        console.log(`
            |---------------------------|
            |Para: ${para}   |
            |---------------------------|
            |${corpo}  |
            |---------------------------|
            De: Bruno Assis
        `);

        var error = false;

        if(error){
            callback('Erro ao enviar o email');
        }else{
            callback();
        }
    },2000);
}

console.log("Inicio do envio de email");
enviarEmail("Oi seja bem bindo ao Guia", "bhmassis@gmail.com", finalEmail); */



//Promise
function takeId(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var alt = false;
            

            if(!alt){
                resolve(6);
            }else{
                var mensageErro = 'Erro 404, verifique sua conexão com a internet!'
                reject(mensageErro);
            }

            
        },1500);
    });
}

function searchDataBase(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var alt = true;

            if(!alt){
                resolve('email@email.com');
            }else{
                var mensageErro = 'Erro 404, verifique sua conexão com a internet!'
                reject(mensageErro);
            }
            
        },2000);
    });
}


function enviarEmail(corpo, para){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log(para);
            console.log(corpo);

            var deuErro = false;

            if(!deuErro){
                resolve({time: 6, to: para, id: '2342'});
            }else{
                var mensageErro = 'Erro 404, verifique sua conexão com a internet!'
                reject(mensageErro);
            }

        }, 9000);
    });
}

async function main(){
    var id = await takeId();
    console.log('Etapa 1 concluida');
    
    try{
        var email = await searchDataBase(id);
        console.log('Etapa 2 concluida');
    }catch(err){
        console.log('Erro na etapa 2: ' + err);
    }
    
    enviarEmail('Olá mundo', email).then(obj => {
        console.log(`
                            Email Enviado com sucesso
                    ---------------------------------------
                    Tempo de envio: ${obj.time}s
                    ---------------------------------------
                    Email enviado para: ${obj.to}
                    ---------------------------------------
                    ID do envio: ${obj.id}
                    ---------------------------------------
                    ID do usuario: ${id}
                `);
    }).catch((err) => {
        console.log(err);
    })
        
}

main();
 







