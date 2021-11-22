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
roteador.get("/add", usuarioController.abreAdd);
//ADD
roteador.post("/add", upload.single("foto"), usuarioController.add);

//READ
//LIST
roteador.get("/", usuarioController.list);
//LIST FILTRO
roteador.post("/", usuarioController.listFiltro);

//UPDATE
//ABRE EDIT
roteador.get("/edit/:id", usuarioController.abreEdit);
//EDIT
roteador.post("/edit/:id", upload.single("foto"), usuarioController.edit);

//DELETE
roteador.get("/del/:id", usuarioController.del);

module.exports = roteador; //exporta a lista de rotas da aplicação - CRUD (create, read, update, delete)