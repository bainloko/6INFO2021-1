/*
* @bainloko
* PROGRAMACAO IV
* 27/09/2021
*/

const express = require("express");
const roteador = express.Router(); //inicializa as rotas do express
const usuarioController = require("../controller/usuarioController");
const upload = require("../config/multerUsuarios");

//CREATE
//ABRE ADD
roteador.get("/add", (req, res, next) => {
    if (req.user.permissao == "admin" || "funcionario"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para adicionar novos usuários!");
        res.redirect("/admin/usuarios");
    }
}, usuarioController.abreAdd);
//ADD
roteador.post("/add", (req, res, next) => {
    if (req.user.permissao == "admin" || "funcionario"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para adicionar novos usuários!");
        res.redirect("/admin/usuarios");
    }
}, upload.single("foto"), usuarioController.add);

//READ
//LIST
roteador.get("/", (req, res, next) => {
    if (req.user.permissao == "admin" || "funcionario" || "usuario"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para abrir a listagem!");
        res.redirect("/admin/livros");
    }
}, usuarioController.list);
//LIST FILTRO
roteador.post("/", (req, res, next) => {
    if (req.user.permissao == "admin" || "funcionario" || "usuario"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para abrir a listagem!");
        res.redirect("/admin/livros");
    }
}, usuarioController.listFiltro);

//UPDATE
//ABRE EDIT
roteador.get("/edit/:id", (req, res, next) => {
    if (req.user.permissao == "admin"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para editar usuários!");
        res.redirect("/admin/usuarios");
    }
}, usuarioController.abreEdit);
//EDIT
roteador.post("/edit/:id", (req, res, next) => {
    if (req.user.permissao == "admin"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para editar usuários!");
        res.redirect("/admin/usuarios");
    }
}, upload.single("foto"), usuarioController.edit);

//DELETE
roteador.get("/del/:id", (req, res, next) => {
    if (req.user.permissao == "admin"){
        return next();
    } else {
        req.flash("msg", "Você não tem permissão para deletar usuários!");
        res.redirect("/admin/usuarios");
    }
}, usuarioController.del);

module.exports = roteador; //exporta a lista de rotas da aplicação - CRUD (create, read, update, delete)