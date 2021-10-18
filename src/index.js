/*
* @bainloko
* PROGRAMACAO IV
* 13/09/2021
*/

const express = require("express");
const path = require("path");
const porta = 3000;

//importação de rotas
const rotas = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //prepara o sistema pra receber dados do formulário

app.set("view engine", "ejs");
app.set("views", "./views/usuario");

app.use(express.static(path.join(__dirname, "public"))); //junta a pasta desejada, a partir da pasta do index, e a deixa disponível para acesso por usuários no /

/* app.get("/:nome", function(req, res){
    res.send("Oi " + req.params.nome + "!");
}); //dois pontos significa recebimento de um parâmetro, no caso o nome */

app.use("/admin/usuarios", rotas);

app.listen(porta, function(req, res){
    console.log("Servidor funcionando na porta " + porta + "!");
});

module.exports = app;