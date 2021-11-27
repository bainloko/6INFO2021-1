/*
* @bainloko
* PROGRAMACAO IV
* 27/10/2021
*/

const Livro = require("../model/Livro");
const { Op } = require("sequelize");
const { unlink } = require("fs/promises");
const path = require("path");

async function abreAdd(req, res){
    try {
        res.render("livros/add.ejs", { msg: req.flash("msg"), logado: req.user });
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
        res.render("livros/list.ejs", { "Livros": livros, msg: req.flash("msg"), logado: req.user });
    } catch(error) {
        res.send("Erro lController list: " + error + ". Tente novamente mais tarde...");
        console.log("Erro lController list: " + error + ". Tente novamente mais tarde...");
    }
}

async function listFiltro(req, res){
    try {
        const livros = await Livro.findAll({
            where: {
                nome: {
                    [Op.iLike]: "%" + req.body.pesquisar + "%",
                },
            },
        });

        res.render("livros/list.ejs", { "Livros": livros, msg: req.flash("msg"), logado: req.user });
    } catch(error) {
        res.send("Erro lController listFiltro: " + error + ". Tente novamente mais tarde...");
        console.log("Erro lController listFiltro: " + error + ". Tente novamente mais tarde...");
    }
}

async function abreEdit(req, res){
    try {
        const livro = await Livro.findByPk(req.params.id);
        res.render("livros/edit.ejs", { livro: livro, msg: req.flash("msg"), logado: req.user });
    } catch(error) {
        res.send("Erro lController abreEdit: " + error + ". Tente novamente mais tarde...");
        console.log("Erro lController abreEdit: " + error + ". Tente novamente mais tarde...");
    }
}

async function edit(req, res){
    try {
        const livro = await Livro.findByPk(req.params.id);
        livro.nome = req.body.nome;
        livro.autor = req.body.autor;
        livro.valor = req.body.valor;
        livro.descricao = req.body.descricao;
        livro.paginas = req.body.paginas;
        livro.editora = req.body.editora;
        livro.anoPubli = req.body.anoPubli;

        if (req.file != undefined){
            let diretorio = path.join(__dirname); //acha a localização atual
            diretorio = path.normalize(diretorio + "/../public/uploads/livros/" + livro.fotoCapa); //concatena o caminho do arquivo desejado
            await unlink(diretorio); //deleta o arquivo
            livro.fotoCapa = req.file.filename;
        }

        livro.save().then((livro) => {
            req.flash("msg", "O livro " + livro.nome + " foi editado com sucesso!");
            res.redirect("/admin/usuarios");
        });
    } catch(error) {
        res.send("Erro lController edit: " + error + ". Tente novamente mais tarde...");
        console.log("Erro lController edit: " + error + ". Tente novamente mais tarde...");
    }
}

async function del(req, res){
    try {
        const deletar = req.params.id;
        let nome = req.params.nome;

        const livro = await Livro.findByPk(deletar); //acha o livro atual pela primary key
        
        let diretorio = path.join(__dirname); //acha a localização atual
        diretorio = path.normalize(diretorio + "/../public/uploads/livros/" + livro.fotoCapa); //concatena o caminho do arquivo desejado
        await unlink(diretorio); //deleta o arquivo

        await livro.destroy().then(() => {
            req.flash("msg", "O livro " + nome + " foi deletado com sucesso!");
            res.redirect("/admin/livros");
        });
    } catch(error) {
        res.send("Erro lController del: " + error + ". Tente novamente mais tarde...");
        console.log("Erro lController del " + error + ". Tente novamente mais tarde...");
    }
}

module.exports = {abreAdd, add, list, listFiltro, abreEdit, edit, del}