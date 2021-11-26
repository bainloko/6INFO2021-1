/*
* @bainloko
* PROGRAMACAO IV
* 25/10/2021
*/

var passport = require("passport"),
LocalStrategy = require("passport-local").Strategy;

const Usuario = require("../model/Usuario");
const bcrypt = require("bcrypt");

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    Usuario.findByPk(id).then(function(user, err){ //o problema estava aqui, esqueci de desinverter a ordem, de "user, err" para "err, user" 
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
                    return done(null, false, req.flash("loginMessage", "Usuário não existe!"));
                }

                if (!bcrypt.compareSync(password, user.senha)){
                    return done(null, false, req.flash("loginMessage", "Senha incorreta!"));
                }

                return done(null, user, req.flash("loginSuccess", "Bem-vindo, " + username + "!"));
            });
        }
    )
);

module.exports = passport;