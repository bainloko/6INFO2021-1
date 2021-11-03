/*
* @bainloko
* PROGRAMACAO IV
* 28/10/2021
*/

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */
  
    try {
      await queryInterface.createTable("Livros", {
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
  
        autor: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        
        valor: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
  
        descricao: {
          type: Sequelize.TEXT,
        },
        
        paginas: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        editora: {
          type: Sequelize.STRING,
        },
  
        anoPubli: {
          type: Sequelize.INTEGER,
        },

        fotoCapa: {
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
      await queryInterface.dropTable("Livros");
    } catch (error) {
      console.log("Erro " + error + ". Tente novamente mais tarde...");
    }
  }
};
