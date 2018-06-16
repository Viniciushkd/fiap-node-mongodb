var express = require('express');
var load = require('express-load');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var error = require('./middlewares/error');

app = express();

//Estabelece conexão com o MongoDB
var mongoose = require('mongoose');
//global.bd = mongoose.connect('mongodb://localhost:27017/neventos'); //conection string
global.bd = mongoose.connect('mongodb://127.0.0.1:27017/neventos'); //conection string

//--Indicativo de conexão
mongoose.connection.on('connected', function(){
  console.log('=====Conexão estabelecida com sucesso=====');
});
mongoose.connection.on('error', function(err){
  console.log('=====Ocorreu um erro: ' + err);
});
mongoose.connection.on('disconnected', function(){
  console.log('=====Conexão finalizada=====');
});

//pasta views é a rais do html
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser('neventos'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//raiz dos arquivos/paginas estaticos é public
app.use(express.static(__dirname + '/public'));

//routes usa a informação do controller que usa a informação do models
load('models')
  .then('controllers')
  .then('routes')
  .into(app);

//middlewares
app.use(error.notFound);
app.use(error.serverError);

app.listen(3000, () => {
  console.log("Aplicação funcionando");
});