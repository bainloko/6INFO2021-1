/*
* @bainloko
* PROGRAMACAO IV
* 28/10/2021
*/

const { Model, DataTypes } = require("sequelize");

class Livro extends Model {
    static init(sequelize){
        super.init({
            //o id não aparece aqui, pois é autoincremento. o mesmo vale pra outros valores automáticos especificados na primeira migration
            nome: DataTypes.STRING,
            autor: DataTypes.STRING,
            valor: DataTypes.DOUBLE,
            descricao: DataTypes.TEXT,
            paginas: DataTypes.INTEGER,
            editora: DataTypes.STRING,
            anoPubli: DataTypes.INTEGER,
            fotoCapa: DataTypes.STRING,
        }, { sequelize, tableName: "Livros" }
        );
    }
}

module.exports = Livro;