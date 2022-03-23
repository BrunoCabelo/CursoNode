const fs = require('fs');
const Reader = require('./components/Class/Reader');
const Processor = require('./components/Class/Processor');
const Table = require('./components/Class/Table');
const HtmlParser = require('./components/Class/HtmlParser');
const Writer = require('./components/Class/Writer');
const PDFWriter = require('./components/Class/PDFWriter');
var leitor = new Reader();
var escritor = new Writer();

async function main(){
    var data = await leitor.Read('./EstudosJS.csv');
    var processedData = await Processor.Process(data);

    var componentes = new Table(processedData);
    var html = await HtmlParser.Parse(componentes);
    
    var result = await escritor.Write(Date.now() + '.html', html);
    PDFWriter.WritePDF(Date.now() + '.pdf', html)
    if(result == true){
        console.log('Arquivo gerado');
    }else{
        console.log('Erro na construção do arquivo');
    }
}

main();