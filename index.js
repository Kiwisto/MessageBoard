var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

app.get('/test/frite1', function(req, res) {
  res.json({ "a": 1, "b": 2 });
});

app.get('/test/frite2', function(req, res) {
  res.json(["Hello", "World"]);
});

app.get('/test/frite3', function(req, res) {
  res.json(42);
});

app.get('/test/frite4', function(req, res) {
  res.json({ "msg": req.url.substr(6) });
});

var n = 0;

app.get('/cpt/inc', function(req, res) {
  var code = 0;
  if (req.query.v == undefined) {
    n += 1;
  }
  else if (parseInt(req.query.v)) {
    n += parseInt(req.query.v);
  }
  else {
    code = -1;
  }
  res.json({ "code": code })
})

app.get('/cpt/query', function(req, res) {
  res.json(n);
});

var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];

app.get('/msg/get/*', function(req, res) {
  var code = 0;
  var v = parseInt(req.url.substr(9))
  if (v != "NaN" && v < allMsgs.length) {
    code = 1;
    var index = v;
  }
  res.json({ "code": code, "msg": allMsgs[index] })
});

app.get('/msg/nber', function(req, res) {
  res.json(allMsgs.length);
});

app.get('/msg/getAll', function(req, res) {
  res.json(allMsgs);
});

app.get('/msg/post/*', function(req, res) {
  allMsgs.push(unescape(req.url.substr(10)));
  res.json(allMsgs.length - 1);
});

app.get('/msg/delAll', function(req, res) {
  allMsgs = [];
  res.json({ "code": 1 })
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");

