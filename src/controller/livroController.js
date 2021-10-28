/*
* @bainloko
* PROGRAMACAO IV
* 27/10/2021
*/

const Livro = require("../model/Livro");
const passport = require("../config/passport");

async function abreAdd(req, res){
    res.render("livros/add.ejs", {});
}

async function add(req, res){
    var { nome, autor, valor, descricao, paginas, editora, dataPubli } = req.body;

    try {
        if (req.file != undefined){
            var fotoCapa = req.file.filename;
        }
        
        await Livro.create({ nome, autor, valor, descricao, paginas, editora, dataPubli, fotoCapa }).then((livro) => {
            res.render("/admin/livros/list", { msg: req.flash("O livro " + livro.nome + " foi adicionado com sucesso!") });
        });
    } catch(error) {
        res.send("Erro " + error + ". Tente novamente mais tarde...");
    }
}

async function list(req, res){
    try {
        const livros = await Livro.findAll();
        res.render("livros/list.ejs", { "Livros" : livros });
    } catch(error) {
        res.send("Erro " + error + ". Tente novamente mais tarde...");
    }
}

async function listFiltro(req, res){}

async function abreEdit(req, res){}

async function edit(req, res){}

async function del(req, res){
    try {
        await Livro.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.redirect("/admin/livros/list", { msg: req.flash("O livro " + req.params.nome + " foi deletado com sucesso!") });
    } catch(error) {
        res.send("Erro " + error + ". Tente novamente mais tarde...");
    }
}

async function auth(req, res){
    res.render("auth.ejs", { msg: req.flash("Você não está logado. Autentique-se acima para ter acesso à página desejada.") });
}

module.exports = {abreAdd, add, list, listFiltro, abreEdit, edit, del, auth}