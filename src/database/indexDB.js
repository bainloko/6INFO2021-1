/*
* @bainloko
* PROGRAMACAO IV
* 27/09/2021
*/

const Sequelize = require("sequelize");
const dbConfig = require("../config/config");
const Usuario = require("../model/Usuario");
const Livro = require("../model/Livro");
const Logs = require("../model/Logs");
const conexao = new Sequelize(dbConfig);

Usuario.init(conexao);
Livro.init(conexao);
Logs.init(conexao);

function teste(){
    try {
        if (conexao.authenticate()){
            console.log("A conexão ao Banco de Dados foi estabelecida com sucesso!");
            return 0;
        } else {
            console.log("Erro ao conectar ao Banco de Dados: " + error + "!");
            conexao.close(dbConfig);
            return 1;
        }
    } catch(error) {
        console.log("Erro ao conectar ao Banco de Dados: " + error + "!");
        conexao.close(dbConfig);
        return 1;
    }
}

module.exports = {conexao, teste};