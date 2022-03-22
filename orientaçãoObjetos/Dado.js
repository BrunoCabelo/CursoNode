class Dado{

    constructor(faces){
        this.faces = faces;
    }

    Rodar(){
        var faces = this.faces;
        var ramdom = Math.random() * (faces * 1) + 1;
        console.log(Math.floor(ramdom));
    }

}

var dado1 = new Dado(22);

dado1.Rodar();