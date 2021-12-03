/*
* @bainloko
* PROGRAMACAO IV
* 28/10/2021
*/

const express = require("express");
const roteador = express.Router(); //inicializa as rotas do express
const livroController = require("../controller/livroController");
const upload = require("../config/multerLivros");

//CREATE
//ABRE ADD
roteador.get("/add", (req, res, next) => {
    if (req.user.permissao == "admin" || "funcionario"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para cadastrar novos livros!");
        res.redirect("/admin/livros");
    }
}, livroController.abreAdd);
//ADD
roteador.post("/add", (req, res, next) => {
    if (req.user.permissao == "admin" || "funcionario"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para cadastrar novos livros!");
        res.redirect("/admin/livros");
    }
}, upload.single("fotoCapa"), livroController.add);

//READ
//LIST
roteador.get("/", (req, res, next) => {
    if (req.user.permissao == "admin" || "funcionario" || "usuario"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para abrir a listagem!");
        res.redirect("/admin/livros");
    }
}, livroController.list);
//LIST FILTRO
roteador.post("/", (req, res, next) => {
    if (req.user.permissao == "admin" || "funcionario" || "usuario"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para abrir a listagem!");
        res.redirect("/admin/livros");
    }
}, livroController.listFiltro);

//UPDATE
//ABRE EDIT
roteador.get("/edit/:id", (req, res, next) => {
    if (req.user.permissao == "admin" || "funcionario"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para editar livros!");
        res.redirect("/admin/livros");
    }
}, livroController.abreEdit);
//EDIT
roteador.post("/edit/:id", (req, res, next) => {
    if (req.user.permissao == "admin" || "funcionario"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para editar livros!");
        res.redirect("/admin/livros");
    }
}, upload.single("fotoCapa"), livroController.edit);

//DELETE
roteador.get("/del/:id", (req, res, next) => {
    if (req.user.permissao == "admin" || "funcionario"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para deletar livros!");
        res.redirect("/admin/livros");
    }
}, livroController.del);

module.exports = roteador; //exporta a lista de rotas da aplicação - CRUD (create, read, update, delete)