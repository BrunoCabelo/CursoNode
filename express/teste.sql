CREATE TABLE usuarios(
    nome VARCHAR(75),
    email VARCHAR(100),
    idade INT
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Albert Assis",
    "albert.a.assis@gmail.com",
    41
);

UPDATE usuarios SET nome = "Bruno Henrique" WHERE nome ="Bruno Assis";