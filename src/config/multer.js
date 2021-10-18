/*
* @bainloko
* PROGRAMACAO IV
* 18/10/2021
*/

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let path = "./public/upload/usuario";
        cb(null, path);
    },

    filename: function(req, file, cb){
        let nomeArquivo = Date.now() + "-" + file.originalname;
        cb(null, nomeArquivo);
    },
});

const upload = multer({ storage });

module.exports = upload;