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
            req.flash("returnTo", req._parsedUrl.path);
            req.flash("msg", "loginMessage");
            res.redirect("/admin/login");
        }
    }
};