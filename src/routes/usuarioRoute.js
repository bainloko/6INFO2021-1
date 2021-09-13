/*
* KAUA MAIA COUSILLAS - IFSUL CAMPUS BAGE
* PROGRAMACAO IV
* 13/09/2021
*/

const express = require("express");
const routes = express.Router(); //inicializa as rotas do express
const usuarioController = require("../controller/usuarioController.js");

//ABRE ADD
routes.get("/add", usuarioController.abreAdd);
//ADD
routes.post("/add", usuarioController.add);

//LIST
routes.get("/", usuarioController.list);
//LIST FILTRO
routes.post("/", usuarioController.listFiltro);

//ABRE EDIT
routes.get("/edit", usuarioController.abreEdit);
//EDIT
routes.post("/edit", usuarioController.edit);

//DELETE
routes.get("/del", usuarioController.del);

module.exports = routes; //exporta a lista de rotas da aplicação - CRUD (create, read, update, delete)