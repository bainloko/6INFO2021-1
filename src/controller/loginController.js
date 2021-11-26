/*
* @bainloko
* PROGRAMACAO IV
* 12/11/2021
*/

const passport = require("../config/passport");
const logar = passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin",
    failureFlash: true,
});

async function abreLogin(req, res){
    try {
        res.render("auth.ejs", { msg: req.flash("loginMessage"), logado: req.user });
    } catch(error) {
        res.send("Erro loginController abreLogin: " + error + ". Tente novamente mais tarde...");
        console.log("Erro loginController abreLogin: " + error + ". Tente novamente mais tarde...");
    }
}

async function sair(req, res){
    try {
        req.logout();
        res.render("auth.ejs", { msg: req.flash("loginMessage", "Você foi deslogado com sucesso!") });       
    } catch(error) {
        res.send("Erro loginController sair: " + error + ". Tente novamente mais tarde...");
        console.log("Erro loginController sair: " + error + ". Tente novamente mais tarde...");
    }
}

module.exports = {abreLogin, logar, sair};