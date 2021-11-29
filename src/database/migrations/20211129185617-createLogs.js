/*
* @bainloko
* PROGRAMACAO IV
* 29/11/2021
*/

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */

    try {
      await queryInterface.createTable("Logs", {
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
  
        idDeletado: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },

        log: {
          type: Sequelize.STRING,
          allowNull: false,
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
      await queryInterface.dropTable("Logs");
    } catch (error) {
      console.log("Erro " + error + ". Tente novamente mais tarde...");
    }
  }
};