var result = require("./response");
const router = require("express").Router();
var nodemailer = require('nodemailer');
var fs = require('fs');
var registration = fs.createReadStream('./routes/registration/index.html',{encoding:'utf-8'});
var forget = fs.createReadStream('./routes/forget/index.html',{encoding:'utf-8'});
var adminCreation = fs.createReadStream('./routes/adminCreation/index.html',{encoding:'utf-8'});
var expiredMail = fs.createReadStream('./routes/expiredMail/index.html',{encoding:'utf-8'});

const con = require("./config");
const emailid = "myhomeinfo.ca89@gmail.com"

const bcrypt = require("bcrypt");
const saltRound = 10;

function sendMail(mailOptions){
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: "smtp.example.com",
		port: 587,
		secure: true, // upgrade later with STARTTLS
		pool: true,
		auth: {
			user: "myhomeinfo.ca89@gmail.com",
			pass: "home123$%"
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
	let password = req.body.password;
	let newDate = new Date()
	let subDate = newDate.getFullYear()+'-'+('0'+(newDate.getMonth()+1)).slice(-2)+'-'+('0'+(newDate.getDate())).slice(-2);
	let subendDate = (newDate.getFullYear()+1)+'-'+('0'+(newDate.getMonth()+1)).slice(-2)+'-'+('0'+(newDate.getDate())).slice(-2);
	let substartdate = req.body.substartdate ? req.body.substartdate : subDate;
	let subenddate = req.body.subenddate ?  req.body.subenddate : subendDate;
	let mono = req.body.mono;
	let account_status = req.body.account_status;
	let payment_amount = req.body.payment_amount;
	let payment_date = req.body.payment_date;
	con.connect(function(err) {
		var sql = "";
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
					 sql = "INSERT INTO owner (name, email, username, address, zipcode, refferedby, substartdate, subenddate, mono, password,account_status,payment_amount,payment_date) VALUES ('"+name+"', '"+email+"', '"+username+"', '"+address+"', '"+zipcode+"', '"+refferedby+"','"+substartdate+"', '"+subenddate+"', '"+mono+"', '"+password+"','"+account_status+"' ,'"+payment_amount+"' ,'"+payment_date+"' )";
					con.query(sql, function (err, user) {
						console.log("sql::",sql)
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
								subject: 'New Acoount Opening',
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
 * Create Admin User
 */
 router.post("/admin", async (req, res) => {
	// id, name, email, username, address, zipcode, refferedby, substartdate, subenddate, mono, password
	let email = req.body.email;
	let username = req.body.username;
	let maxProperty = req.body.maxProperty;
	let password = req.body.password;
	let newDate = new Date()
	let subDate = newDate.getFullYear()+'-'+('0'+(newDate.getMonth()+1)).slice(-2)+'-'+('0'+(newDate.getDate())).slice(-2);
	let subendDate = (newDate.getFullYear()+1)+'-'+('0'+(newDate.getMonth()+1)).slice(-2)+'-'+('0'+(newDate.getDate())).slice(-2);
	let substartdate = req.body.substartdate ? req.body.substartdate : subDate;
	let subenddate = req.body.subenddate ?  req.body.subenddate : subendDate;
	let mono = req.body.mono;
	let account_status = req.body.account_status;
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let role = req.body.role;
	let renewalDate = req.body.renewalDate;
	let spaceUsage = req.body.spaceUsage;
	let id = req.body.id;
	con.connect(function(err) {
		var sql = "";
		var sql = "SELECT * From owner where email='"+req.body.email+"' OR mono = '"+req.body.mono+"'";
		con.query(sql, function (err, user) {
			if (user.length > 0 && id === '') {
				res.send(
					result.response(
						200,
						{},
						"Email Or Mobile No already exist !"
					)
				);
			
			}
			 else 
			{
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
					sql = "INSERT INTO owner (email, username,firstname,lastname,maxProperty,role,renewalDate,spaceUsage, substartdate, subenddate, mono, password,account_status) VALUES ('"+email+"', '"+username+"','"+firstname+"','"+lastname+"','"+maxProperty+"','"+role+"','"+renewalDate+"','"+spaceUsage+"','"+substartdate+"', '"+subenddate+"', '"+mono+"', '"+password+"','"+account_status+"' )";
				  
					if(id){
						sql = "UPDATE owner SET email= '"+email+"',username= '"+username+"',firstname= '"+firstname+"',lastname= '"+lastname+"',maxProperty= '"+maxProperty+"',role= '"+role+"',renewalDate= '"+renewalDate+"',spaceUsage= '"+spaceUsage+"',substartdate= '"+substartdate+"',subenddate= '"+subenddate+"',mono= '"+mono+"',password= '"+password+"',account_status= '"+account_status+"' WHERE id = '"+id+"'";
					}
					con.query(sql, function (err, user) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} 
						else {
							 sql = "SELECT * From owner order by id desc";
							var lastTab = false; 
							if(id){
							  if(req.body.lastTab){
								lastTab =  true;
							  }
							  admin = {user}
								res.send(
									result.response(
										200,
										admin,
										"Updated successfully!",
										lastTab
									)
								);
							} 
							 {
								adminCreation.on('data', function (chunk) {
    
									let msg = chunk.replace("%USERNAME%", email);
									 msg = msg.replace("%PASSWORD%",password);
									
									adminCreation = msg;
									var mailOptions = {
										from: emailid,
										to: email,
										subject: 'New User Registration. ',
										html: adminCreation
									};
									sendMail(mailOptions)
									admin = {user}
									res.send(
									result.response(
										200,
										user,
										"Congratulation ! You have successfully created user !"
									)
									);
								});
								//console.log("adminCreation",adminCreation);
							
						
							
							}
						}
					});
				//});
			}
		});
	});
});
// role listing

router.post("/roleOfUser", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "User is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT * FROM roleofuser"
			con.query(sql, function (err, user) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				}else {
					userRoleList = [...user]
					res.send(result.response(200, userRoleList, "User Details"));
				}
			});
		});
	}
  });
/**

 * Read one user details
 */
 router.post("/userdeatils", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "User is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT *  FROM owner where id ='"+req.body.id+"'";
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
// * Get All user Details list
//  */
router.post("/getuserAllData", async (req, res) => {
	// if (!req.body.house_id) {
	// 	res.send(result.response(422, "", "house_id is empty"));
	// }else
	{	con.connect(function(err) {
		// var sql = "SELECT transactions.id, account_name, is_deleted,date, contact_person, type, amount, comments,receipt, created_at, entered_by, contacts.groupname,contacts.companyname From transactions INNER JOIN contacts ON transactions.account_name = contacts.id where is_deleted = 0 and transactions.house_id='"+req.body.house_id+"'";
		let userList = [];
		var sql = "SELECT * From owner order by id desc"
		con.query(sql, function (err, user) {
			if (err) {
				res.send(
					result.response(
						500,
						err,
						"OOPS, Something went wrong !, Please try again"
					)
				);
			} 
			else {
				console.log("mail",req.body.sentmailId)
				if(req.body.sentmailId)
				{let currentDate = new Date()
				let expiryAlertDate = (currentDate.getFullYear())+'-'+('0'+(currentDate.getMonth()+1)).slice(-2)+'-'+('0'+(currentDate.getDate()-1)).slice(-2);
		
				let userData = user.map((item) => {
					let subEndDate = new Date(item.subenddate)
					let subendDate = (subEndDate.getFullYear())+'-'+('0'+(subEndDate.getMonth()+1)).slice(-2)+'-'+('0'+(subEndDate.getDate()-1)).slice(-2);
				
					if(subendDate === expiryAlertDate) {
						expiredMail.on('data', function (chunk) {
    
							let msg = chunk.replace("%CUSTOMER NAME%", item.username);
							 msg = msg.replace("%PLAN%",item.substartdate);
							expiredMail = msg;
							
						var mailOptions = {
							from: emailid,
							to: item.email,
							subject: 'Your Account Will Be Expired Tommorrow, Please Renew It To Keep In Touch... ',
							html: expiredMail
						};
						sendMail(mailOptions)
							});
					}
				})
				res.send(result.response(200, {}, "Your Account Will Be Expired Tommorrow, Please Renew It To Keep In Touch..."));
			}
			else
			{	userList = [...user]
				res.send(result.response(200, userList, "User All Data"));	}		
			}
		});
	})}
});

/**
 * Get single User data
 */
 router.post("/getsingleuser", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT * From owner where id='"+req.body.id+"'";
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
							"User does not found !"
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
 * Delete single User
 */
 router.post("/deletesingleUser", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {

			var sql = "delete From owner where id='"+req.body.id+"'";
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
							"User does not found !"
						)
					);
				} else {
					let userList = [];
					var sql = "SELECT * From owner order by id desc";
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
									"Users does not found !"
								)
							);
						} else {
							userList = [...user]
							res.send(result.response(200, userList, "User deleted successfully!"));
						}
					});
				}
			});
		});
	}
});

/**
 * DeActive single User
 */
 router.post("/deActiveUser", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "update owner set account_status = 'Expired' where id='"+req.body.id+"'";
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
							"User does not found !"
						)
					);
				} else {
					let userList = [];
					var sql = "SELECT * From owner order by id desc";
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
									"Users does not found !"
								)
							);
						} else {
							userList = [...user]
							res.send(result.response(200, userList, "User Deactivate successfully!"));
						}
					});
				}
			});
		});
	}
});
/**
 * Active single User
 */
 router.post("/activeUser", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
     
		con.connect(function(err) {
			var sql = "update owner set account_status = 'Active' where id='"+req.body.id+"'";
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
							"User does not found !"
						)
					);
				} else {
					let userList = [];
					var sql = "SELECT * From owner order by id desc";
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
									"Users does not found !"
								)
							);
						} else {
							userList = [...user]
							res.send(result.response(200, userList, "User Activate successfully!"));
						}
					});
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

			var sql = "SELECT owner.id, name, email, username, password, subenddate,role ,country from owner where email = '"+email+"' AND password='"+password+"'";

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
					sql = "SELECT substartdate, subenddate ,role from owner where email = '"+email+"'";
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
							let role = user[0]['role'];
						if(role != 1 ){
							console.log("role::2")
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
	let account_status = req.body.account_status;
	let payment_amount = req.body.payment_amount;
	let payment_date = req.body.payment_date;
	

	con.connect(function(err) {
		
		var sql = "Update owner set name = '"+name+"', email='"+email+"', username='"+username+"', address='"+address+"', zipcode='"+zipcode+"', refferedby='"+refferedby+"',maxProperty='"+maxProperty+"', substartdate='"+substartdate+"', subenddate='"+subenddate+"', mono='"+mono+"',account_status='"+account_status+"',payment_amount='"+payment_amount+"',payment_date='"+payment_date+"' where id = '"+id+"'";

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
				sql =  "SELECT * FROM owner WHERE id='"+id+"'"
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
