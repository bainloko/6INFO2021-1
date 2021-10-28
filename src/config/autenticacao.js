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
            req.flash("msg", "Você precisa estar autenticado para acessar essa página!");
            res.redirect("/admin/");
        }
    };
};