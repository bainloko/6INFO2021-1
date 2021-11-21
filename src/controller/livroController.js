/*
* @bainloko
* PROGRAMACAO IV
* 27/10/2021
*/

const Livro = require("../model/Livro");
const { Op } = require("sequelize");

async function abreAdd(req, res){
    try {
        res.render("livros/add.ejs", { msg: req.flash("msg") });
    } catch(error) {
        res.send("Erro lController abreAdd: " + error + ". Tente novamente mais tarde...");
        console.log("Erro lController abreAdd: " + error + ". Tente novamente mais tarde...");
    }
}

async function add(req, res){
    var { nome, autor, valor, descricao, paginas, editora, anoPubli } = req.body;

    try {
        if (req.file != undefined){
            var fotoCapa = req.file.filename;
        }
        
        await Livro.create({ nome, autor, valor, descricao, paginas, editora, anoPubli, fotoCapa }).then((livro) => {
            req.flash("msg", "O livro " + livro.nome + " foi adicionado com sucesso!");
            res.redirect("/admin/livros");
        });
    } catch(error) {
        res.send("Erro lController add: " + error + ". Tente novamente mais tarde...");
        console.log("Erro lController add: " + error + ". Tente novamente mais tarde...");
    }
}

async function list(req, res){
    try {
        const livros = await Livro.findAll();
        res.render("livros/list.ejs", { "Livros" : livros, msg: req.flash("msg") });
    } catch(error) {
        res.send("Erro lController list: " + error + ". Tente novamente mais tarde...");
        console.log("Erro lController list: " + error + ". Tente novamente mais tarde...");
    }
}

async function listFiltro(req, res){
    try {
        const usuarios = await Livro.findAll({
            where: {
                nome: {
                    [Op.iLike]: "%" + req.body.pesquisar + "%",
                },
            },
        });

        res.render("livros/list.ejs", { "Livros": livros, msg: req.flash("msg") });
    } catch(error) {
        res.send("Erro lController listFiltro: " + error + ". Tente novamente mais tarde...");
        console.log("Erro lController listFiltro: " + error + ". Tente novamente mais tarde...");
    }
}

async function abreEdit(req, res){}

async function edit(req, res){}

async function del(req, res){
    try {
        req.flash("msg", "O livro " + req.params.nome + " foi deletado com sucesso!");
        await Livro.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.redirect("/admin/livros");
    } catch(error) {
        res.send("Erro lController del: " + error + ". Tente novamente mais tarde...");
        console.log("Erro lController del " + error + ". Tente novamente mais tarde...");
    }
}

module.exports = {abreAdd, add, list, listFiltro, abreEdit, edit, del}