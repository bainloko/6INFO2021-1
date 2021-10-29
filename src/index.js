/*
* @bainloko
* PROGRAMACAO IV
* 13/09/2021
*/

//imports iniciais, porta, autenticação
const express = require("express");
const app = express();
const path = require("path");
const porta = 3000;
const session = require("express-session");
const flash = require("req-flash");
const passport = require("passport");

const aut = require("./config/autenticacao");

//importação de rotas
const rotaLogin = require("./routes/rotaLogin");
const rotaUsuarios = require("./routes/rotaUsuarios");
const rotaLivros = require("./routes/rotaLivros");

//importação das configurações do banco de dados
require("./database/indexDB");

app.use(
    session({
        secret: "secret",
        saveUninitialized: true,
        resave: true,
    })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //prepara o sistema pra receber dados do formulário

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public"))); //junta a pasta desejada, a partir da pasta do index, e a deixa disponível para acesso por usuários no /

//catch errors...
app.use(function(req, res, next){
    var err = new Error("Página não encontrada!");
    err.status = 404;
    next(err);
});

//handle errors...
if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).send(err.message);
    });
}

//the two blocks of code above are courtesy of bryanmac: https://stackoverflow.com/users/775184/bryanmac, https://stackoverflow.com/questions/36113101/handling-404-500-and-exceptions-in-node-js-and-express

/* app.get("/:nome", function(req, res){
    res.send("Oi " + req.params.nome + "!");
}); //dois pontos significa recebimento de um parâmetro, no caso o nome */

//rotas sem autenticação (for emergencies only!)
//app.use("/admin", rotaLogin);
//app.use("/admin/usuarios", rotaUsuarios);
//app.use("/admin/livros", rotaLivros);
//rotas com autenticação indireta
app.use("/admin", rotaLogin);
//rotas com autenticação direta
app.use("/admin/usuarios", aut.autenticacao(), rotaUsuarios);
app.use("/admin/livros", aut.autenticacao(), rotaLivros);

app.listen(porta, function(req, res){
    console.log("Servidor funcionando na porta " + porta + "!");
});

module.exports = app;