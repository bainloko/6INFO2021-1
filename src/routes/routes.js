/*
* @bainloko
* PROGRAMACAO IV
* 27/09/2021
*/

const express = require("express");
const roteador = express.Router(); //inicializa as rotas do express
const usuarioController = require("../controller/usuarioController");

//ABRE ADD
roteador.get("/add", usuarioController.abreAdd);
//ADD
roteador.post("/add", usuarioController.add);

//LIST
roteador.get("/", usuarioController.list);
//LIST FILTRO
roteador.post("/", usuarioController.listFiltro);

//ABRE EDIT
roteador.get("/edit", usuarioController.abreEdit);
//EDIT
roteador.post("/edit", usuarioController.edit);

//DELETE
roteador.get("/del", usuarioController.del);

module.exports = roteador; //exporta a lista de rotas da aplicação - CRUD (create, read, update, delete)