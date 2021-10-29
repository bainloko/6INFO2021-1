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

roteador.get("/*", aut.autenticacao(), aut.index());
roteador.get("/usuarios", usuarioController.list);
roteador.get("/livros", livroController.list);

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