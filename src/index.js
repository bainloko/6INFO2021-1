/*
* KAUA MAIA COUSILLAS - IFSUL CAMPUS BAGE
* PROGRAMACAO IV
* 13/09/2021
*/

const express = require("express");
const app = express();
const path = require("path");

//importação de rotas
const usuarioRoute = require("./routes/usuarioRoute.js");

app.use(express.urlencoded({ extended: true })); //prepara o sistema pra receber dados do formulário

/*
app.get("/", function(req, res){
    res.send("Oi mundo!");
});
*/

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.static(path.join(__dirname, "public"))); //junta a pasta desejada, a partir da pasta do index, e a deixa disponível para acesso por usuários no /

/*
app.get("/", function(req, res){
    res.render("index.ejs");
});

app.get("/:nome", function(req, res){
    res.send("Oi " + req.params.nome);
}); //dois pontos significa recebimento de um parâmetro, no caso o nome
*/

app.use("/admin/usuario", usuarioRoute);

app.listen(3000, function(req, res){
    console.log("Servidor funcionando!");
});