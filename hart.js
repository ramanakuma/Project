var mysql = require('mysql');


module.exports = {

	port : 8087,

 	sql : mysql.createConnection({
    	host     : 'localhost',
    	user     : 'root',
    	password : '123456',
    	database : 'Sample',
    	multipleStatements: true

  	}),
     

}
