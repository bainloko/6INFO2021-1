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
            req.flash("msg", "O livro " + livro.nome + " foi adicionado com sucesso!");
            res.redirect("/admin/livros");
        });
    } catch(error) {
        res.send("Erro lController " + error + ". Tente novamente mais tarde...");
    }
}

async function list(req, res){
    try {
        const livros = await Livro.findAll();
        res.render("livros/list.ejs", { msg: req.flash("msg"), "Livros" : livros });
    } catch(error) {
        res.send("Erro lController " + error + ". Tente novamente mais tarde...");
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
        req.flash("O livro " + req.params.nome + " foi deletado com sucesso!");
        res.redirect("/admin/livros");
    } catch(error) {
        res.send("Erro lController " + error + ". Tente novamente mais tarde...");
    }
}

module.exports = {abreAdd, add, list, listFiltro, abreEdit, edit, del}