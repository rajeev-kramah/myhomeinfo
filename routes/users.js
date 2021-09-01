var result = require("./response");
const router = require("express").Router();
var nodemailer = require('nodemailer');
var fs = require('fs');
var registration = fs.createReadStream('./routes/registration/index.html',{encoding:'utf-8'});
var forget = fs.createReadStream('./routes/forget/index.html',{encoding:'utf-8'});
const con = require("./config");
const emailid = "myhomeinfo.ca@gmail.com"

const bcrypt = require("bcrypt");
const saltRound = 10;

function sendMail(mailOptions){
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: "smtp.example.com",
		port: 587,
		secure: false, // upgrade later with STARTTLS
		pool: true,
		auth: {
			user: "mksinghnitc@gmail.com",
			pass: "manoharkumarsingh@89"
		}
	});
	
	transporter.sendMail(mailOptions, function(er, info){
		console.log(info,er)
		if (error) {
			console.log("error: ", error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}



/**
 * Create User
 */
router.post("/", async (req, res) => {
	// id, name, email, username, address, zipcode, refferedby, substartdate, subenddate, mono, password
	let name = req.body.name;
	let email = req.body.email;
	let username = req.body.username;
	let address = req.body.address;
	let zipcode = req.body.zipcode;
	let refferedby = req.body.refferedby;
	let maxProperty = req.body.maxProperty;
	let substartdate = req.body.substartdate ? req.body.substartdate : new Date();
	let subenddate = req.body.subenddate ?  req.body.subenddate : new Date(new Date().setFullYear(new Date().getFullYear() + 1));
	let mono = req.body.mono;
	let password = req.body.password;
	con.connect(function(err) {
		var sql = "SELECT * From owner where email='"+req.body.email+"' OR mono = '"+req.body.mono+"'";
		con.query(sql, function (err, user) {
			console.log(user);
		 if (user.length > 0) {
				res.send(
					result.response(
						200,
						{},
						"Email Or Mobile No already exist !"
					)
				);
			} else {
				let hash_pass = "";
				// bcrypt.hash(password, saltRound, function(er, hash) {
				// 	if(er) {
				// 		res.send(
				// 			result.response(
				// 				500,
				// 				er,
				// 				"OOPS, Something went wrong !, Please try again"
				// 			)
				// 		);
				// 	}
				// 	hash_pass = hash;
					var sql = "INSERT INTO owner (name, email, username, address, zipcode, refferedby,maxProperty, substartdate, subenddate, mono, password) VALUES ('"+name+"', '"+email+"', '"+username+"', '"+address+"', '"+zipcode+"', '"+refferedby+"', '"+substartdate+"', '"+subenddate+"', '"+mono+"', '"+password+"')";
					con.query(sql, function (err, user) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else {
							var mailOptions = {
								from: emailid,
								to: email,
								subject: 'New Account Opening',
								html: registration
							};
							sendMail(mailOptions)
							res.send(
								result.response(
									200,
									user,
									"Congratulation ! You have succefully registered !"
								)
							);
						}
					});
				//});
			}
		});
	});
});

/**
 * Read one user details
 */
 router.post("/userdeatils", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "User is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT id, name, email, username, address, zipcode, refferedby,maxProperty, substartdate, subenddate, mono FROM owner where id ='"+req.body.id+"'";
			con.query(sql, function (err, user) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (user.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Please Enter valid Email and Password !"
						)
					);
				} else {
					res.send(result.response(200, user, "User Details"));
				}
			});
		});
	}
  });

/**
 * User Login
 */
 router.post("/login", async (req, res) => {
	if (!req.body.email) {
		res.send(result.response(422, "", "Email is empty"));
	} else if (!req.body.password) {
		res.send(result.response(422, "", "Password is empty"));
	} else {
		con.connect(function(err) {
			let password = req.body.password;
			let email = req.body.email;

			var sql = "SELECT owner.id, name, email, username, password, subenddate from owner where email = '"+email+"' AND password='"+password+"'";

			con.query(sql, function (err, user) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (user.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Invalid Email Id Or Your Subscription is Expired !"
						)
					);
				} else {
					//let hash = user[0]['password'];
					sql = "SELECT substartdate, subenddate from owner where email = '"+email+"'";
					con.query(sql, function (err, user) {
						if(err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else {
							let startdate = user[0]['substartdate'];
							let enddate = user[0]['subenddate'];

							if(startdate === '' || enddate === '') {
								res.send(
									result.response(
										404,
										{},
										"You are not subscribed. Kindly subscribe it."
									)
								);
							}

							enddate = new Date(enddate + 'T00:00:00Z');
							let current = new Date();

							// Comparing dates
							enddate = Math.floor(enddate.getTime() / 86400000);
							current = Math.floor(current.getTime() / 86400000);

							if(enddate < current) {
								res.send(
									result.response(
										404,
										{},
										"Your subscription expired. Kindly renew your subscribion."
									)
								);
							}
						}
					});

					sql = "SELECT count(house_id) as housecount from share where email = '"+email+"'";
					con.query(sql, function (err, houseCount) {
						if(err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else {
							user[0]['housecount'] = houseCount[0]['housecount'];
							user[0]['password'] = "";
							res.send(result.response(200, user, "Succefully Logged In !"));
						}
					});
					// bcrypt.compare(password, hash, function(er, rst) {
					// 	if(er) {
					// 		res.send(
					// 			result.response(
					// 				500,
					// 				err,
					// 				"OOPS, Something went wrong !, Please try again"
					// 			)
					// 		);
					// 	}
					// 	if(!rst) {
					// 		res.send(
					// 			result.response(
					// 				404,
					// 				{},
					// 				"Please enter valid Email Id and Password."
					// 			)
					// 		);
					// 	}
					// 	sql = "SELECT count(house_id) as housecount from share where email = '"+email+"'";
					// 	con.query(sql, function (err, houseCount) {
					// 		if(err) {
					// 			res.send(
					// 				result.response(
					// 					500,
					// 					err,
					// 					"OOPS, Something went wrong !, Please try again"
					// 				)
					// 			);
					// 		} else {
					// 			user[0]['housecount'] = houseCount[0]['housecount'];
					// 			user[0]['password'] = "";
					// 			res.send(result.response(200, user, "Succefully Logged In !"));
					// 		}
					// 	});
					// });
				}
			});
		});
	}
});


/**
 * Forget Password
 */
 router.post("/forget", async (req, res) => {
	if (!req.body.email) {
		res.send(result.response(422, "", "Email is empty"));
	}else {
		con.connect(function(err) {
			var sql = "SELECT * From owner where email='"+req.body.email+"'";
			con.query(sql, function (err, user) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (user.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Please Enter valid Email!"
						)
					);
				} else {
					var mailOptions = {
						from: emailid,
						to: req.body.email,
						subject: 'Reset Password',
						html : forget
						//html : 'Hello,<br> Please Click on the link to verify your email.<br><a  to={{state: { email: '+req.body.email+'}}} href="http://localhost:3000/reset-password/'+req.body.email+'">Click here to Reset</a>',
					};
					sendMail(mailOptions);
					
				 res.send(result.response(200, user, "Please check email to reset password !"));
				}
			});
		});
	}
});


/**
 * Reset Password
 */
 router.post("/reset", async (req, res) => {
	if (!req.body.email) {
		res.send(result.response(422, "", "Email is empty"));
	} else if (!req.body.password) {
		res.send(result.response(422, "", "Password is empty"));
	} else {
		let email = req.body.email;
		let password = req.body.password;

		con.connect(function(err) {
			var sql = "SELECT * From owner where email='"+email+"'";
			con.query(sql, function (err, user) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (user.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Please Enter valid Email!"
						)
					);
				} else {
					// bcrypt.hash(password, saltRound, function(er, hash) {
					// 	if(er) {
					// 		res.send(
					// 			result.response(
					// 				500,
					// 				er,
					// 				"OOPS, Something went wrong !, Please try again"
					// 			)
					// 		);
					// 	}
						
						var sql = "UPDATE owner SET password = '"+password+"' WHERE email = '"+email+"'";
						con.query(sql, function (err, user) {
							if (err) {
								res.send(
									result.response(
										500,
										err,
										"OOPS, Something went wrong !, Please try again"
									)
								);
							} else if (user.length === 0) {
								res.send(
									result.response(
										404,
										{},
										"Please Enter valid Email and Password !"
									)
								);
							}else{
								 var sql = "SELECT * From owner where email='"+req.body.email+"'";
								 con.query(sql, function (err, user) {
									if (err) {
										res.send(
											result.response(
												500,
												err,
												"OOPS, Something went wrong !, Please try again"
											)
										);
									}else{
										user[0]['password'] = '';
										res.send(result.response(200, user, "Password is successfully updated !"));
									}
								});
							}	
						});
					//});
				}
			});
		});
	}
});


/**
 * Update User
 */
router.post("/updateuser", async (req, res) => {
	let id = req.body.id;
	let name = req.body.name;
	let email = req.body.email;
	let username = req.body.username;
	let address = req.body.address;
	let zipcode = req.body.zipcode;
	let refferedby = req.body.refferedby;
	let maxProperty = req.body.maxProperty;
	let substartdate = req.body.substartdate;
	let subenddate = req.body.subenddate;
	let mono = req.body.mono;

	con.connect(function(err) {
		
		var sql = "Update owner set name = '"+name+"', email='"+email+"', username='"+username+"', address='"+address+"', zipcode='"+zipcode+"', refferedby='"+refferedby+"',maxProperty='"+maxProperty+"', substartdate='"+substartdate+"', subenddate='"+subenddate+"', mono='"+mono+"' where id = '"+id+"'";

		con.query(sql, function (err, user) {
			if (err) {
				res.send(
					result.response(
						500,
						err,
						"OOPS, Something went wrong !, Please try again"
					)
				);
			} else {
				sql =  "SELECT id, name, email, username, address, zipcode, refferedby, maxProperty , substartdate, subenddate, mono FROM owner WHERE id='"+id+"'"
				con.query(sql, function (err, users) {
					console.log("users",users)
					if (err) {
						res.send(
							result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
							)
						);
					} else {
						res.send(
							result.response(
								200,
								users,
								"Account updated Successfiully!"
							)
						);
					}
				});
			}
		});
	});
});

module.exports = router;
