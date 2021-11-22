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
roteador.get("/", aut.index(), loginController.abreLogin);

//LOGAR
roteador.post("/", (req, res, next) => {
    if (database.teste() === 0){
        return next();
    } else {
        req.flash("loginMessage", "Erro ao conectar ao Banco de Dados!");
        res.redirect("/admin");
    }
}, loginController.logar);

//SAIR
roteador.get("/sair", loginController.sair);

module.exports = roteador; //exporta a lista de rotas da aplicação