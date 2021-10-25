/*
* @bainloko
* PROGRAMACAO IV
* 25/10/2021
*/

const express = require("express");
const roteador = express.Router(); //inicializa as rotas do express
const usuarioController = require("../controller/usuarioController");
const passport = require("../config/passport");

roteador.get("/", usuarioController.index);

//LOG-IN
roteador.post("/",
    passport.authenticate("local", {
        successRedirect: "/admin/usuarios",
        failureRedirect: "/admin",
        failureFlash: true,
    })
);

module.exports = roteador; //exporta a lista de rotas da aplicação