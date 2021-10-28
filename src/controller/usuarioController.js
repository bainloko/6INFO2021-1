/*
* @bainloko
* PROGRAMACAO IV
* 13/09/2021
*/

const Usuario = require("../model/Usuario");
const passport = require("../config/passport");

async function abreAdd(req, res){
    res.render("usuarios/add.ejs", {});
}

async function add(req, res){
    var { nome, email, senha } = req.body;

    try {
        if (req.file != undefined){
            var foto = req.file.filename;
        }
        
        await Usuario.create({ nome, email, senha, foto }).then((usuario) => {
            res.render("/admin/usuarios/list", { msg: req.flash("O usuário " + usuario.nome + " foi criado com sucesso!") });
        });
    } catch(error) {
        res.send("Erro " + error + ". Tente novamente mais tarde...");
    }
}

async function list(req, res){
    try {
        const usuarios = await Usuario.findAll();
        res.render("usuarios/list.ejs", { "Usuarios" : usuarios });
    } catch(error) {
        res.send("Erro " + error + ". Tente novamente mais tarde...");
    }
}

async function listFiltro(req, res){}

async function abreEdit(req, res){}

async function edit(req, res){}

async function del(req, res){
    try {
        await Usuario.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.redirect("/admin/usuarios/list", { msg: req.flash("O usuário " + req.params.nome + " (" + req.params.email + ")" + " foi deletado com sucesso!") });
    } catch(error) {
        res.send("Erro " + error + ". Tente novamente mais tarde...");
    }
}

async function auth(req, res){
    res.render("auth.ejs", { msg: req.flash("Você não está logado. Autentique-se acima para ter acesso à página desejada.") });
}

module.exports = {abreAdd, add, list, listFiltro, abreEdit, edit, del, auth}