/*
* KAUA MAIA COUSILLAS - IFSUL CAMPUS BAGE
* PROGRAMACAO IV
* 27/09/2021
*/

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */
    
    await queryInterface.addColumn(
      "produtos",
      "tamanho",
      Sequelize.DOUBLE
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     */
    
    await queryInterface.removeColumn("produtos", "tamanho");
  }
};
