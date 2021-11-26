/*
* @bainloko
* PROGRAMACAO IV
* 25/10/2021
*/

exports.autenticacao = function(){
    return function(req, res, next){
        if (req.isAuthenticated()){
            return next(); //NEXT MIDDLEWARE FUNCTION!!!!!!!! outra coisa que demorei um tempo pra entender...
        } else {
            req.flash("msg", "loginMessage");
            res.redirect("/admin");
        }
    }
};

exports.index = function(){
    return function(req, res){
        if (req.isAuthenticated()){
            res.render("index.ejs", { msg: req.flash("loginSuccess"), logado: req.user });
        } else {
            res.render("auth.ejs", { msg: req.flash("loginMessage") });
        }
    }
};