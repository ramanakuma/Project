var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var express = require('express');
var app = express();
var hart = require('./hart');
var new = require(something for tsting);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/mainroutes')(app);
require('./routes/loginroutes')(app);
hart.sql.connect(function(err){
  if(!err) {
      console.log("MySql Database is connected ... ");
  } else {
      console.log("Error connecting database ... ");
  }
});



app.use(express.static(path.join(__dirname, '')));




app.get('/', function(req,res){

  res.sendFile(path.resolve(__dirname, 'Public/index.html'));
});

// Listen for requests
app.listen(hart.port,function(e){
   if(!e)
   {
      console.log('Server running at localhost:'+hart.port);
   }
})
