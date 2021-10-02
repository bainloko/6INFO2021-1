/*
* @bainloko
* PROGRAMACAO IV
* 27/09/2021
*/

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */

    await queryInterface.createTable("usuarios", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false
      },

      telefone: { //somente números
        type: Sequelize.INTEGER
      },
      
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },

      foto: {
        type: Sequelize.STRING,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     */
    
    await queryInterface.dropTable("usuarios");
  }
};
