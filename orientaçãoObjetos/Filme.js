class Filme{

    constructor(titulo, ano, genero, diretor, duracao){
        this.titulo = titulo;
        this.ano = ano;
        this.genero = genero;
        this.diretor = diretor;
        this.duracao = duracao;
        this.atores = [];
    }

    Reproduzir(){
        console.log('Reproduzindo...');
    }

    Pausar(){
        console.log('Pausado ||');
    }

    Avançar(){
        console.log('Avançado >>');
    }

    Fechar(){
        console.log('Fechado X');
    }

    Ficha(){
        console.log(`
            Titulo: ${this.titulo}.
            Ano: ${this.ano}.
            Genero: ${this.genero}.
            Diretor: ${this.diretor}.
            Atores: ${this.atores}.
            Duração: ${this.duracao}.
        `);
    }

}

var vingadores = new Filme('Vingadores 2', '2014', 'Ação', 'Michal Jackson', '125 minutos');

vingadores.atores = ['Kenue', 'Jhon macgomery', 'Lucky'];

vingadores.Ficha();