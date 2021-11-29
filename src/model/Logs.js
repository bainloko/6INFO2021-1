/*
* @bainloko
* PROGRAMACAO IV
* 29/11/2021
*/

const { Model, DataTypes } = require("sequelize");

class Logs extends Model {
    static init(sequelize){
        super.init({
            //o id não aparece aqui, pois é autoincremento. o mesmo vale pra outros valores automáticos especificados na primeira migration
            nome: DataTypes.STRING,
            idDeletado: DataTypes.BIGINT,
            log: DataTypes.STRING,
        }, { sequelize, freezeTableName: true }
        );
    }
}

module.exports = Logs;