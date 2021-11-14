/*
* @bainloko
* PROGRAMACAO IV
* 12/11/2021
*/

const passport = require("../config/passport");

async function abreLogin(req, res){
    res.render("auth.ejs", { msg: req.flash("loginMessage") });
}

const logar = passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin",
    failureFlash: true,
});

module.exports = {abreLogin, logar};