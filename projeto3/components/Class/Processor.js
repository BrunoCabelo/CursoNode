class Processor{
    static Process(data){
        var rows = [];
        try{
            var a = data.split('\r\n');
            a.forEach(row => {
                var arr = row.split(';');
                rows.push(arr);
            });
            return rows;
        }catch{
            console.log(`
            ------------------------------------------------------
                Um Erro inesperado ocorreu durante o processo

                - Verifique se o nome do arquivo está correto
                - Verifique se realmente é um arquivo CSV
                - Reinicie a aplicação e tente novamente!

            ------------------------------------------------------
            `)
            return false;
        }
    }
}

module.exports = Processor;