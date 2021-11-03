/*
* @bainloko
* PROGRAMACAO IV
* 25/10/2021
*/

const express = require("express");
const roteador = express.Router(); //inicializa as rotas do express
const usuarioController = require("../controller/usuarioController");
const livroController = require("../controller/livroController");
const passport = require("../config/passport");
const aut = require("../config/autenticacao");

//rotas... TODOS OS BUGS CORRIGIDOS, DE NOVO EU FIQUEI QUEBRANDO A CABEÇA PRA NADA, OS PROBLEMAS ERAM POR CAUSA DA ORDEM INVERTIDA AAAAAAAAAAAAAAAAAAAAA
roteador.get("/", aut.index(), aut.autenticacao());
roteador.get("/usuarios", aut.autenticacao(), usuarioController.list);
roteador.get("/livros", aut.autenticacao(), livroController.list);

//LOG-IN
roteador.post("/",
    passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/admin",
        failureFlash: true,
    })
);

roteador.post("/usuarios",
    passport.authenticate("local", {
        successRedirect: "/admin/usuarios",
        failureRedirect: "/admin",
        failureFlash: true,
    })
);

roteador.post("/livros",
    passport.authenticate("local", {
        successRedirect: "/admin/livros",
        failureRedirect: "/admin",
        failureFlash: true,
    })
);

module.exports = roteador; //exporta a lista de rotas da aplicação