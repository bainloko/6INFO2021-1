/*
* @bainloko
* PROGRAMACAO IV
* 27/09/2021
*/

const { Model, DataTypes } = require("sequelize");

class Produto extends Model {
    static init(sequelize){
        super.init({
            //o id não aparece aqui, pois é autoincremento. o mesmo vale pra outros valores automáticos especificados na primeira migration
            nome: DataTypes.STRING,
            valor: DataTypes.DOUBLE,
        }, { sequelize, tableName: "Produtos" }
        );
    }
}

module.exports = Produto;