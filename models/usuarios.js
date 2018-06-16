module.exports = (app) => {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var usuario = Schema({
        nome:{type: String, require: true, index: {unique: true } },
        senha:{type: String, require: true }
    });
    return mongoose.model('usuarios', usuario)
}