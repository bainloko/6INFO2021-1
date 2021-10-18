/*
* @bainloko
* PROGRAMACAO IV
* 27/09/2021
*/

const { Model, DataTypes } = require("sequelize");

class Usuario extends Model {
    static init(sequelize){
        super.init({
            //o id não aparece aqui, pois é autoincremento. o mesmo vale pra outros valores automáticos
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            foto: DataTypes.STRING
        }, { sequelize, freezeTableName: true }
        );
    }
}

module.exports = Usuario;