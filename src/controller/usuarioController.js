/*
* @bainloko
* PROGRAMACAO IV
* 13/09/2021
*/

const Usuario = require("../model/Usuario");

async function abreAdd(req, res){
    res.render("add.ejs");
}

async function add(req, res){
    const { nome, email, senha, foto } = req.body;

    await Usuario.create({nome, email, senha, foto}).then((usuario) => {
        res.render("index.ejs");
    });
}

async function list(req, res){
    res.render("list.ejs");
}

async function listFiltro(req, res){
    res.send("Olá Mundo!");
}

async function abreEdit(req, res){
    res.send("Olá Mundo!");
    //res.render("edit.ejs");
}

async function edit(req, res){
    res.render("edit.ejs");
}

async function del(req, res){
    res.send("Olá Mundo!");
}

module.exports = {abreAdd, add, list, listFiltro, abreEdit, edit, del}