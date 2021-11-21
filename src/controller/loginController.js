/*
* @bainloko
* PROGRAMACAO IV
* 12/11/2021
*/

const passport = require("../config/passport");
const database = require("../database/indexDB");
var logar, err = "Erro ao conectar ao Banco de Dados!";

async function abreLogin(req, res){
    res.render("auth.ejs", { msg: req.flash("loginMessage") });
}

if(database.conectar() == 0){
    logar = passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/admin",
        failureFlash: true,
    });
} else {
    logar = (req, res) => {
        req.flash("loginMessage", err);
        res.redirect("/admin");
    }
}

module.exports = {abreLogin, logar};