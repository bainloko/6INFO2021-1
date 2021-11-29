/*
* @bainloko
* PROGRAMACAO IV
* 13/09/2021 -> 29/11/2021
*/

//imports das bibliotecas iniciais, sessão, secret, middleware para mensagens e a declaração da porta a ser usada
const express = require("express");
const path = require("path");
const timeout = require("connect-timeout");
const session = require("express-session");
const env = require("./env");
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

app.use(timeout(15000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
    if (!req.timedout) next();
}

app.use(
    session({     
        secret: env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { sameSite: "Lax", maxAge: 1800000, },
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

//catch HTTP errors... courtesy of bryanmac: https://stackoverflow.com/users/775184/bryanmac, https://stackoverflow.com/questions/36113101/handling-404-500-and-exceptions-in-node-js-and-express
app.use(function(req, res, next){
    var err = new Error();
    err.status = 404;
    next(err);
});

//handle errors... only the res.status(err.status || 400, 401, 404 & 500).send(err.message); is courtesy of bryanmac: https://stackoverflow.com/users/775184/bryanmac, https://stackoverflow.com/questions/36113101/handling-404-500-and-exceptions-in-node-js-and-express
app.use(function(err, req, res, next) {
    if (err.status == 400){
        err.message = "<h2>400 Bad Request. Erros na requisição do cliente.<br>Te redirecionando para a página inicial em 10 segundos... Caso nada acontecer, clique <a href='/admin'>aqui</a>.</h2><script>window.setTimeout(() => {window.location = '/admin'}, 10000);</script>";
        res.status(err.status || 400).send(err.message);
        err.message = "400 Bad Request. Erros na requisição do cliente.";
    } else if (err.status == 401){
        err.message = "<h2>401 Unauthorized. Você não está logado!<br>Te redirecionando para a tela de login em 10 segundos... Caso nada acontecer, clique <a href='/admin'>aqui</a>.</h2><script>window.setTimeout(() => {window.location = '/admin'}, 10000);</script>";
        res.status(err.status || 401).send(err.message);
        err.message = "401 Unauthorized. Você não está logado!";
    } else if (err.status == 404){
        err.message = "<h2>404 Not Found. Página não encontrada!<br>Te redirecionando para a página inicial em 10 segundos... Caso nada acontecer, clique <a href='/admin'>aqui</a>.</h2><script>window.setTimeout(() => {window.location = '/admin'}, 10000);</script>";
        res.status(err.status || 404).send(err.message);
        err.message = "404 Not Found. Página não encontrada!";
    } else {
        err.message = "<h2>500 Internal Server Error. Erro interno do servidor, páginas inacessíveis, etc.:<br>" + err + "<br>Te redirecionando para a página inicial em 10 segundos... Caso nada acontecer, clique <a href='/admin'>aqui</a>.</h2><script>window.setTimeout(() => {window.location = '/admin'}, 10000);</script>";
        res.status(err.status || 500).send(err.message);
        err.message = "500 Internal Server Error. Erro interno do servidor, páginas inacessíveis, etc.:\n" + err;
    }

    console.log(err.message);
});

app.listen(porta, function(){
    console.log("Servidor funcionando na porta " + porta + "!");
});

module.exports = app;