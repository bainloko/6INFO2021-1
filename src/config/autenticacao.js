/*
* @bainloko
* PROGRAMACAO IV
* 25/10/2021
*/

exports.autenticacao = function(){
    return function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        } else {
            res.render("auth.ejs", { msg: req.flash("msg", "Você não está logado. Autentique-se acima para ter acesso à página desejada.") });
        }
    }
};

exports.index = function(){
    return function(req, res){
        if (req.isAuthenticated()){
            return res.render("index.ejs", { msg: req.flash("msg") });
        } else {
            res.render("auth.ejs", { msg: req.flash("msg", "Você não está logado. Autentique-se acima para ter acesso à página desejada.") });
        }
    }
};