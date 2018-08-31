var path = require('path');
module.exports = function(app){
  app.get('/index',function(req,res){
		res.sendFile(path.resolve(__dirname,'../public/index.html'));
	});
  app.get('/feedback',function(req,res){
		res.sendFile(path.resolve(__dirname,'../public/feedback.html'));
	});
  app.get('/addemployee',function(req,res){
		res.sendFile(path.resolve(__dirname,'../public/addemployee.html'));
	});
}
