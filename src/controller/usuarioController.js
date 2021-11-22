/*
* @bainloko
* PROGRAMACAO IV
* 13/09/2021
*/

const Usuario = require("../model/Usuario");
const { Op } = require("sequelize");

async function abreAdd(req, res){
    try {
        res.render("usuarios/add.ejs", { msg: req.flash("msg") });
    } catch(error) {
        res.send("Erro uController abreAdd: " + error + ". Tente novamente mais tarde...");
        console.log("Erro uController abreAdd: " + error + ". Tente novamente mais tarde...");
    }
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
        res.send("Erro uController add: " + error + ". Tente novamente mais tarde...");
        console.log("Erro uController add: " + error + ". Tente novamente mais tarde...");
    }
}

async function list(req, res){
    try {
        const usuarios = await Usuario.findAll();
        res.render("usuarios/list.ejs", { "Usuarios": usuarios, msg: req.flash("msg") });
    } catch(error) {
        res.send("Erro uController list: " + error + ". Tente novamente mais tarde...");
        console.log("Erro uController list: " + error + ". Tente novamente mais tarde...");
    }
}

async function listFiltro(req, res){
    try {
        const usuarios = await Usuario.findAll({
            where: {
                nome: {
                    [Op.iLike]: "%" + req.body.pesquisar + "%",
                },
            },
        });

        res.render("usuarios/list.ejs", { "Usuarios": usuarios, msg: req.flash("msg") });
    } catch(error) {
        res.send("Erro uController listFiltro: " + error + ". Tente novamente mais tarde...");
        console.log("Erro uController listFiltro: " + error + ". Tente novamente mais tarde...");
    }
}

async function abreEdit(req, res){
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        res.render("usuarios/edit.ejs", { "Usuario": usuario, msg: req.flash("msg") });
    } catch(error) {
        res.send("Erro uController abreEdit: " + error + ". Tente novamente mais tarde...");
        console.log("Erro uController abreEdit: " + error + ". Tente novamente mais tarde...");
    }
}

async function edit(req, res){
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        usuario.nome = req.body.nome;
        usuario.email = req.body.email;
        usuario.senha = req.body.senha;

        if (req.file != undefined){
            usuario.foto = req.file.filename;
        }

        usuario.save().then((usuario) => {
            req.flash("msg", "O Usuário " + usuario.nome + " foi editado com sucesso!");
            res.redirect("/admin/usuarios");
        });
    } catch(error) {
        res.send("Erro uController edit: " + error + ". Tente novamente mais tarde...");
        console.log("Erro uController edit: " + error + ". Tente novamente mais tarde...");
    }
}

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
        res.send("Erro uController del: " + error + ". Tente novamente mais tarde...");
        console.log("Erro uController del: " + error + ". Tente novamente mais tarde...");
    }
}

module.exports = {abreAdd, add, list, listFiltro, abreEdit, edit, del}