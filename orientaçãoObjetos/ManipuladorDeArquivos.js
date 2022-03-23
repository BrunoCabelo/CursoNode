class Leitor{
    Ler(caminho){
        console.log('Conteudo do arquivo!');
    }
}

class Escritor{
    Escrever(arquivo, conteudo){
        console.log('Conteudo escrito');
    }
}

class Criador{
    Criar(nome){
        console.log('Arquivo criado');
    }
}

class Destruidor{
    Deletar(nome){
        console.log('Arquivo deletado');
    }
}

class ManipuladorDeArquivos{
    constructor(nome){
        this.arquivo = nome;
        this.leitor = new Leitor();
        this. escritor = new Escritor();
        this.criador = new Criador();
        this.destruidor = new Destruidor();
    }
}

var manipulador = new ManipuladorDeArquivos();

manipulador.criador.Criar('arquivo.txt');