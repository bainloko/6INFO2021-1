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
      await queryInterface.addColumn("Produtos", "tamanho", Sequelize.DOUBLE);
    } catch (error) {
      console.log("Erro " + error + ". Tente novamente mais tarde...");
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     */
    
    try {
      await queryInterface.removeColumn("Produtos", "tamanho");
    } catch (error) {
      console.log("Erro " + error + ". Tente novamente mais tarde...");
    }
  }
};
