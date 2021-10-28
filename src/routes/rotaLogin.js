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

roteador.get("/",
    async function index(req, res){
        try {
            res.render("index.ejs", { msg: req.flash("msg") });
        } catch (error) {
            res.send("Erro " + error + ". Tente novamente mais tarde...");
        }
    }
);

roteador.get("/usuarios", usuarioController.auth);
roteador.get("/livros", livroController.auth);

//LOG-IN
roteador.post("/usuarios",
    passport.authenticate("local", {
        successRedirect: "/admin/usuarios/list",
        failureRedirect: "/admin",
        failureFlash: true,
    })
);

roteador.post("/livros",
    passport.authenticate("local", {
        successRedirect: "/admin/livros/list",
        failureRedirect: "/admin",
        failureFlash: true,
    })
);

module.exports = roteador; //exporta a lista de rotas da aplicação