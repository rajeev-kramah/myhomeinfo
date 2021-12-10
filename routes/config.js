var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "myhomeinfo"
});



con.connect(function(err) {
	if(err) {
		console.log('error when connecting to db:', err);
		setTimeout(handleDisconnection, 2000);
	}
});



// function handleDisconnection() {
// 	var connection = mysql.createConnection(con);
// 	 connection.connect(function(err) {
// 		 if(err) {
// 			 setTimeout('handleDisconnection()', 2000);
// 		 }
// 	 });
 
// 	 connection.on('error', function(err) {
// 		 logger.error('db error', err);
// 		 if(err.code === 'PROTOCOL_CONNECTION_LOST') {
// 			 logger.error('db error execute reconnection:'+err.message);
// 			 handleDisconnection();
// 		 } else {
// 			 throw err;
// 		 }
// 	 });
// 	 exports.connection = connection;
//  }


con.on('error', function(err) {
	console.log('db error', err);
	if(err.code === 'PROTOCOL_CONNECTION_LOST') {
		var con = mysql.createConnection({
			host: "localhost",
			port: 3306,
			user: "root",
			password: "",
			database: "myhomeinfo"
		});
		
		
		
		con.connect(function(err) {
			if(err) {
				console.log('error when connecting to db:', err);
				setTimeout(handleDisconnection, 2000);
			}
		});
	}else{
		throw err;
	}
});

module.exports = con;