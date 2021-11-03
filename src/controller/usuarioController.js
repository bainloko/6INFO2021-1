/*
* @bainloko
* PROGRAMACAO IV
* 13/09/2021
*/

const Usuario = require("../model/Usuario");

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
            req.flash("msg", "O usuário " + usuario.nome + " foi criado com sucesso!");
            res.redirect("/admin/usuarios");
        });
    } catch(error) {
        res.send("Erro uController " + error + ". Tente novamente mais tarde...");
    }
}

async function list(req, res){
    try {
        const usuarios = await Usuario.findAll();
        res.render("usuarios/list.ejs", { msg: req.flash("msg"), "Usuarios" : usuarios });
    } catch(error) {
        res.send("Erro uController " + error + ". Tente novamente mais tarde...");
    }
}

async function listFiltro(req, res){}

async function abreEdit(req, res){}

async function edit(req, res){}

async function del(req, res){
    try {
        req.flash("msg", "O usuário " + req.params.nome + " (" + req.params.email + ")" + " foi deletado com sucesso!");
        await Usuario.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.redirect("/admin/usuarios");
    } catch(error) {
        res.send("Erro uController " + error + ". Tente novamente mais tarde...");
    }
}

module.exports = {abreAdd, add, list, listFiltro, abreEdit, edit, del}