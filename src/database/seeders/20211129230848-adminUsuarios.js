/*
* @bainloko
* PROGRAMACAO IV
* 29/11/2021
*/

'use strict';

const env = require("../../env");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

      return queryInterface.bulkInsert("Usuarios", [{
        nome: "Kauã",
        email: "kaua@kaua.com",
        senha: env.senha,
        foto: "1638226567227-326930002-20210521_162536_HDR.jpg",
        permissao: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

      try {
        return queryInterface.bulkDelete("Usuarios", null, {});
      } catch (error) {
        console.log("Erro " + error + ". Tente novamente mais tarde...")
      }
    
  }
};