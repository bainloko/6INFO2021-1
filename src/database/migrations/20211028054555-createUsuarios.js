/*
* @bainloko
* PROGRAMACAO IV
* 27/09/2021, 28/10/2021
*/

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */

    try {
      await queryInterface.createTable("Usuarios", {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
  
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
  
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        
        senha: {
          type: Sequelize.STRING,
          allowNull: false,
        },
  
        foto: {
          type: Sequelize.STRING,
        },
  
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
  
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
    } catch (error) {
      console.log("Erro " + error + ". Tente novamente mais tarde...");
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     */
    
    try {
      await queryInterface.dropTable("Usuarios");
    } catch (error) {
      console.log("Erro " + error + ". Tente novamente mais tarde...");
    }
  }
};