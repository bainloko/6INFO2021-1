/*
* @bainloko
* PROGRAMACAO IV
* 13/09/2021
*/

const Usuario = require("../model/Usuario");
const Logs = require("../model/Logs");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { unlink } = require("fs/promises");
const path = require("path");

async function abreAdd(req, res){
    try {
        res.render("usuarios/add.ejs", { msg: req.flash("msg"), logado: req.user });
    } catch(error) {
        res.send("Erro uController abreAdd: " + error + ". Tente novamente mais tarde...");
        console.log("Erro uController abreAdd: " + error + ". Tente novamente mais tarde...");
    }
}

async function add(req, res){
    var { nome, email, senha, permissao } = req.body;

    try {
        senha = bcrypt.hashSync(senha, 10);

        if (req.file != undefined){
            var foto = req.file.filename;
        }

        await Usuario.create({ nome, email, senha, foto, permissao }).then((usuario) => {
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
        res.render("usuarios/list.ejs", { Usuarios: usuarios, msg: req.flash("msg"), logado: req.user });
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

        res.render("usuarios/list.ejs", { Usuarios: usuarios, msg: req.flash("msg"), logado: req.user });
    } catch(error) {
        res.send("Erro uController listFiltro: " + error + ". Tente novamente mais tarde...");
        console.log("Erro uController listFiltro: " + error + ". Tente novamente mais tarde...");
    }
}

async function abreEdit(req, res){
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        res.render("usuarios/edit.ejs", { usuario: usuario, msg: req.flash("msg"), logado: req.user });
    } catch(error) {
        res.send("Erro uController abreEdit: " + error + ". Tente novamente mais tarde...");
        console.log("Erro uController abreEdit: " + error + ". Tente novamente mais tarde...");
    }
}

async function edit(req, res){
    try {
        const usuario = await Usuario.findByPk(req.params.id);

        if (req.body.senha != ""){
            const hash = bcrypt.hashSync(req.body.senha, 10); //criptografa a senha com um salt de 10 iterações
            usuario.senha = hash;
        }

        usuario.nome = req.body.nome;
        usuario.email = req.body.email;
        usuario.permissao = req.body.permissao;

        if (req.file != undefined){
            let diretorio = path.join(__dirname); //acha a localização atual
            diretorio = path.normalize(diretorio + "/../public/uploads/usuarios/" + usuario.foto); //concatena o caminho do arquivo desejado
            await unlink(diretorio); //deleta o arquivo
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
        const deletar = req.params.id;

        if (deletar == req.user.id){
            req.flash("msg", "O usuário logado não pode ser deletado!");
            res.redirect("/admin/usuarios");
        } else {
            const usuario = await Usuario.findByPk(deletar); //acha o usuário atual pela primary key
            let nome = usuario.nome, email = usuario.email;

            let diretorio = path.join(__dirname); //acha a localização atual
            diretorio = path.normalize(diretorio + "/../public/uploads/usuarios/" + usuario.foto); //concatena o caminho do arquivo desejado
            await unlink(diretorio); //deleta o arquivo

            await usuario.destroy().then(() => {
                let idDeletado = deletar;
                let log = "O usuário " + nome + " (" + email + ")" + " foi deletado com sucesso!";

                Logs.create({ nome, idDeletado, log });
                req.flash("msg", log);
                res.redirect("/admin/usuarios");
            });
        }
    } catch(error) {
        res.send("Erro uController del: " + error + ". Tente novamente mais tarde...");
        console.log("Erro uController del: " + error + ". Tente novamente mais tarde...");
    }
}

module.exports = {abreAdd, add, list, listFiltro, abreEdit, edit, del}