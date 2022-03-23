const fs = require('fs');
const Reader = require('./components/Class/Reader');
const Processor = require('./components/Class/Processor');
const Table = require('./components/Class/Table');
const HtmlParser = require('./components/Class/HtmlParser');
const Writer = require('./components/Class/Writer');
const PDFWriter = require('./components/Class/PDFWriter');
const Console = require('./components/Class/Console');
var leitor = new Reader();
var escritor = new Writer();



async function main(){
    var nomeArchive = await Console();
    
    var data = await leitor.Read('./arquivos/' + nomeArchive);
    var processedData = await Processor.Process(data);

    if(processedData == false){
        return false;
    }

    var componentes = new Table(processedData);
    var html = await HtmlParser.Parse(componentes);
    
    var resultHTML = await escritor.Write('./arquivos/' + nomeArchive + '.html', html);
    var resultPDF = PDFWriter.WritePDF('./arquivos/' + nomeArchive + '.pdf', html);

    if(resultHTML == true){
        console.log('Arquivo HTML gerado');
    }else{
        console.log('Erro na construção do arquivo HTML');
    }

    if(resultPDF == true){
        console.log('Arquivo PDF gerado');
    }else{
        console.log('Erro na construção do arquivo PDF');
    }
}

main();