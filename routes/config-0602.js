var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	port: 3308 ,
	user: "root",
	password: "",
	database: "myhomeinfo"
});

module.exports = con;