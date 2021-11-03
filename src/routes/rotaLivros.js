/*
* @bainloko
* PROGRAMACAO IV
* 28/10/2021
*/

const express = require("express");
const roteador = express.Router(); //inicializa as rotas do express
const livroController = require("../controller/livroController");
const upload = require("../config/multerLivros");

//ABRE ADD
roteador.get("/add", livroController.abreAdd);
//ADD
roteador.post("/add", upload.single("fotoCapa"), livroController.add);

//LIST
roteador.get("/", livroController.list);
//LIST FILTRO
roteador.post("/", livroController.listFiltro);

//ABRE EDIT
roteador.get("/edit", livroController.abreEdit);
//EDIT
roteador.post("/edit", livroController.edit);

//DELETE
roteador.get("/del/:id", livroController.del);

module.exports = roteador; //exporta a lista de rotas da aplicação - CRUD (create, read, update, delete)