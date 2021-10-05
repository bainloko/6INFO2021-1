/*
* @bainloko
* PROGRAMACAO IV
* 27/09/2021
*/

const Sequelize = require("sequelize");
const dbConfig = require("../config/config");
const Usuario = require("../model/Usuario");
const conexao = new Sequelize(dbConfig);

Usuario.init(conexao);

module.exports = conexao;