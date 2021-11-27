/*
* @bainloko
* PROGRAMACAO IV
* 12/11/2021
*/

const passport = require("../config/passport");
const logar = passport.authenticate("local", {
    successReturnToOrRedirect: "/admin",
    failureRedirect: "/admin/login",
    failureFlash: true,
});

async function abreLogin(req, res){
    try {
        res.render("auth.ejs", { msg: req.flash("loginMessage") });
    } catch(error) {
        res.send("Erro loginController abreLogin: " + error + ". Tente novamente mais tarde...");
        console.log("Erro loginController abreLogin: " + error + ". Tente novamente mais tarde...");
    }
}

async function index(req, res){
    try {
        res.render("index.ejs", { msg: req.flash("loginSuccess"), logado: req.user });
    } catch(error) {
        res.send("Erro loginController index: " + error + ". Tente novamente mais tarde...");
        console.log("Erro loginController index: " + error + ". Tente novamente mais tarde...");
    }
}

async function sair(req, res){
    try {
        req.logout();
        req.flash("loginMessage", "Você foi deslogado com sucesso!");
        res.redirect("/admin");
    } catch(error) {
        res.send("Erro loginController sair: " + error + ". Tente novamente mais tarde...");
        console.log("Erro loginController sair: " + error + ". Tente novamente mais tarde...");
    }
}

module.exports = {abreLogin, logar, index, sair};