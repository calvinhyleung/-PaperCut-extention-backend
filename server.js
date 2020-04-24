const express = require('express');
const app = express();
const router = express.Router();
const server = app.listen(3000, listening);
//const path = __dirname + '/views/';
const port = 8080;

function listening(){
    console.log("listening...");
}

app.use(express.static('website'));

app.get('/print/:first/:cost', printTest);

function printTest(request, response){
    var data = request.params;
    var first = data.first;
    var cost = data.cost;
    var reply = first+" "+cost
    response.send("success");
}

/*
router.use(function (req,res,next) {
    console.log('/' + req.method);
    next();
});
  
router.get('/', function(req,res){
    res.sendFile(path + 'index.html');
});
  
router.get('/sharks', function(req,res){
    res.sendFile(path + 'sharks.html');
});

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
    console.log('Example app listening on port 8080!')
})
*/