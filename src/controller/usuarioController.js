/*
* @bainloko
* PROGRAMACAO IV
* 13/09/2021
*/

const Usuario = require("../model/Usuario.js");

async function abreAdd(req, res){
    res.send("Olá Mundo!");
}

async function add(req, res){
    Usuario.create({nome, email, telefone, senha, foto});
}

async function list(req, res){
    res.send("Olá Mundo!");
}

async function listFiltro(req, res){
    res.send("Olá Mundo!");
}

async function abreEdit(req, res){
    res.send("Olá Mundo!");
}

async function edit(req, res){
    res.send("Olá Mundo!");
}

async function del(req, res){
    res.send("Olá Mundo!");
}

module.exports = {abreAdd, add, list, listFiltro, abreEdit, edit, del}