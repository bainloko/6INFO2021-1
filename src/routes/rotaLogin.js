/*
* @bainloko
* PROGRAMACAO IV
* 25/10/2021
*/

const express = require("express");
const roteador = express.Router(); //inicializa as rotas do express
const loginController = require("../controller/loginController");
const aut = require("../config/autenticacao");

//ABRE LOGIN
roteador.get("/", aut.index(), loginController.abreLogin);

//LOGAR
roteador.post("/", loginController.logar);

module.exports = roteador; //exporta a lista de rotas da aplicação