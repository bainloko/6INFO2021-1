/*
* @bainloko
* PROGRAMACAO IV
* 25/10/2021
*/

const express = require("express");
const roteador = express.Router(); //inicializa as rotas do express
const database = require("../database/indexDB");
const loginController = require("../controller/loginController");
const aut = require("../config/autenticacao");

//ABRE LOGIN
roteador.get("/login", loginController.abreLogin);

//INDEX
roteador.get("/", aut.autenticacao(), loginController.index);

//LOGAR
roteador.post("/login", (req, res, next) => {
    if (database.teste() === 0){
        return next();
    } else {
        req.flash("loginMessage", "Erro ao conectar ao Banco de Dados!");
        res.redirect("/admin/login");
    }
}, loginController.logar, (req, res) => {
    if (req.body.returnTo != "/admin" && req.body.returnTo !== "/" && req.body.returnTo != ""){
        res.redirect(req.body.returnTo);
    } else {
        res.redirect("/admin");
    }
});

//SAIR
roteador.get("/sair", loginController.sair);

module.exports = roteador; //exporta a lista de rotas da aplicação