/*
* @bainloko
* PROGRAMACAO IV
* 28/10/2021
*/

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let path = "./public/uploads/livros";
        cb(null, path);
    },

    filename: function(req, file, cb){
        let nomeArquivo = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname;
        cb(null, nomeArquivo);
    },
});

const upload = multer({ storage });

module.exports = upload;