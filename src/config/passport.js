/*
* @bainloko
* PROGRAMACAO IV
* 25/10/2021
*/

const Usuario = require("../model/Usuario");

var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    Usuario.findByPk(id).then(function(user, err){ //o problema estava aqui, esqueci de desinverter a ordem, de "err, user" para "user, err"
        done(err, user);
    });
});

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "senha",
            passReqToCallback: true,
        },

        function(req, username, password, done){
            Usuario.findOne({ where: { email: username } }).then(function(user, err){
                if (err){
                    return done(err);
                }

                if (!user){
                    return done(null, false, req.flash("msg", "Usuário não existe!"));
                }

                if (user.senha != password){
                    return done(null, false, req.flash("msg", "Senha incorreta!!"));
                }

                return done(null, user);
            });
        }
    )
);

module.exports = passport;