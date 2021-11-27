/*
* @bainloko
* PROGRAMACAO IV
* 25/10/2021
*/

exports.autenticacao = function(){
    return function(req, res, next){
        if (req.isAuthenticated()){
            if (req.path != "" && req.path != "/" && req.path != ("/admin" || "/admin/") && req.path != ("/admin/login" || "/admin/login/")){
                return res.redirect(req.session.returnTo);
            } else {
                return next(); //NEXT MIDDLEWARE FUNCTION!!!!!!!! outra coisa que demorei um tempo pra entender...
            }
        } else {
            req.session.returnTo = req.completeUrl;
            req.flash("msg", "loginMessage");
            res.redirect("/admin/login");
        }
    }
};