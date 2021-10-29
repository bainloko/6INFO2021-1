/*
* @bainloko
* PROGRAMACAO IV
* 27/09/2021
*/

const Sequelize = require("sequelize");
const dbConfig = require("../config/config");
const Usuario = require("../model/Usuario");
const Livro = require("../model/Livro");
const conexao = new Sequelize(dbConfig);

try {
    Usuario.init(conexao);
    Livro.init(conexao);
} catch (error) {
    res.send("Erro BD " + error + ". Tente novamente mais tarde...");
}

module.exports = conexao;