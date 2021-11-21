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

async function conectar(){
    try {
        Usuario.init(conexao);
        Livro.init(conexao);
        
        await conexao.authenticate();
        console.log("A conexão ao Banco de Dados foi estabelecida com sucesso!");
        return 0;
    } catch(error) {
        console.log("Erro ao conectar ao Banco de Dados: " + error + "!");
        conexao.close(dbConfig);
        return 1;
    }
}

module.exports = {conexao, conectar};