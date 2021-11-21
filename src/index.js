/*
* @bainloko
* PROGRAMACAO IV
* 13/09/2021
*/

//imports das bibliotecas iniciais, sessão, middleware para mensagens e a declaração da porta a ser usada
const express = require("express");
const path = require("path");
const timeout = require("connect-timeout");
const session = require("express-session");
const flash = require("req-flash");
const porta = 3000;

//autenticação
const passport = require("passport");
const aut = require("./config/autenticacao");

//importação das rotas
const rotaLogin = require("./routes/rotaLogin");
const rotaUsuarios = require("./routes/rotaUsuarios");
const rotaLivros = require("./routes/rotaLivros");

//importação das configurações do banco de dados e o handler para erros na conexão ao BD
require("./database/indexDB");

//inicialização do servidor
const app = express();

app.use(timeout(12000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
    if (!req.timedout) next();
}

app.use(
    session({     
        secret: "secret",
        saveUninitialized: true,
        resave: true,
        cookie: { maxAge: 1800 },
    })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public"))); //junta a pasta desejada, a partir da pasta do index, e a deixa disponível para acesso por usuários no /

/* 
app.get("/:nome", function(req, res){
    res.send("Oi " + req.params.nome + "!");
}); //dois pontos significa recebimento de um parâmetro, no caso o nome
*/

//declaração das rotas
app.use("/admin", rotaLogin);
app.use("/admin/usuarios", aut.autenticacao(), rotaUsuarios);
app.use("/admin/livros", aut.autenticacao(), rotaLivros);

//catch HTTP errors...
app.use(function(req, res, next){
    var err = new Error();
    err.status = 404;
    next(err);
});

//handle errors...
app.use(function(err, req, res, next) {
    if (err.status == 400){
        err.message = "400, Bad Request. Erros no cliente...";
        res.status(err.status || 400).send(err.message);
    } else if (err.status == 404){
        err.message = "404, Not Found. Página não encontrada!";
        res.status(err.status || 404).send(err.message);
    } else {
        err.message = "500, Internal Server Error. Erro interno do servidor, páginas inacessíveis, etc.";
        res.status(err.status || 500).send(err.message);
    }

    console.log(err.message);
});

//the two blocks of code above are courtesy of bryanmac: https://stackoverflow.com/users/775184/bryanmac, https://stackoverflow.com/questions/36113101/handling-404-500-and-exceptions-in-node-js-and-express

app.listen(porta, function(){
    console.log("Servidor funcionando na porta " + porta + "!");
});

module.exports = app;