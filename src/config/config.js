/*
* @bainloko
* PROGRAMACAO IV
* 04/10/2021
*/

const env = require("../env");

module.exports = {
    "username": "postgres",
    "password": env.password,
    "database": "info2021-1",
    "dialect": "postgres",
    "host": "localhost",
    "define": {
        "timestamps": true
    },
};