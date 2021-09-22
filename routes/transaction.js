var result = require("./response");
const router = require("express").Router();
const multer = require("multer");
const con = require("./config");
const fs = require("fs");

const removeFile = (path) => {
    fs.unlink(path, (err) => {
        if(err) {
            return false;
        } else {
            return true;
        }
    });
}

/** Storage Engine */
const storage = multer.diskStorage({
    destination: function(req, file, fn) {
      fn(null, "./public/files");
    },
    filename: function(req, file, fn) {
      fn(null, new Date().getTime().toString() + "-" + file.originalname);
    }
  });
  const fileFilter = function(req, file, callback) {
    console.log("File Type:" , file.mimetype);
    if (file.mimetype) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  };
  const upload = multer({
    storage: storage,
    limit: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
  /*Image Upload code complete*/


/**
 * Create Transaction
*/
router.post("/", upload.single("receipt"), async (req, res) => {
//id, account_name, contact_person, type, date, amount, entered_by, receipt, comments, add_to_home_cost, add_to_warranty, debit, created_at, is_deleted, deleted_date, deleted_by, house_id, product_name, warranty_id, principal, interest, extraprincipal, escrow, loanbalance, escrowbalance
	let id = req.body.id; 
	let account_name = req.body.account_name;
	let contact_person = req.body.contact_person;
	let type = req.body.type;
	let date = req.body.date;
	let amount = req.body.amount; 
	let entered_by = req.body.entered_by;
	let comments = req.body.comments;
	let receipt = req.body.receipt;;
	let add_to_home_cost = req.body.add_to_home_cost;
	let add_to_warranty = req.body.add_to_warranty;
	let debit = req.body.debit;
	let house_id = req.body.house_id;
	let product_name = req.body.product_name;
	let warranty_id = req.body.warranty_id;
	let principal =  req.body.principal;
	let interest =  req.body.interest;
	let extraprincipal = req.body.extraprincipal;
	let escrow = req.body.escrow;
	let loanbalance =  req.body.loanbalance;
	let escrowbalance =  req.body.escrowbalance;

	con.connect(function(err) {
        // if (req.file) {
        //     receipt = req.file.path;
        // }
		var sql = "";

		if(add_to_warranty == 1) {
			
			if(warranty_id == '' || warranty_id == 'null' || warranty_id == null) {
				sql = "INSERT INTO warranty (product_name, warranty_provider, contact_person, comments, house_id) VALUES ('"+product_name+"', '"+account_name+"', '"+contact_person+"', '"+comments+"', '"+house_id+"')";
			} else {
				sql = "UPDATE warranty SET product_name = '"+product_name+"', warranty_provider = '"+account_name+"', contact_person = '"+contact_person+"', comments = '"+comments+"' where id = '"+warranty_id+"'";
			}

			con.query(sql, function (err, warranty) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				}
			});

			if(!warranty_id) {
				sql =  "SELECT * FROM warranty WHERE ID = (SELECT MAX(ID) FROM warranty)";
				con.query(sql, function (err, warranty) {
					if (err) {
						res.send(
							result.response(
								500,
								err,
								"OOPS, Something went wrong !, Please try again"
							)
						);
					} else {
						warranty_id = warranty[0].id;

						/**Inserting in Transaction Warranty Details */
						sql = "INSERT INTO transactions (account_name, contact_person, type, date, amount, entered_by, comments, receipt, add_to_home_cost, add_to_warranty, debit, house_id, product_name, warranty_id, principal, interest, extraprincipal, escrow, loanbalance, escrowbalance) VALUES ('"+account_name+"', '"+contact_person+"', '"+type+"', '"+date+"', '"+amount+"', '"+entered_by+"','"+comments+"', '"+receipt+"', '"+add_to_home_cost+"', '"+add_to_warranty+"', '"+debit+"', '"+house_id+"', '"+product_name+"', '"+warranty_id+"', '"+principal+"', '"+interest+"', '"+extraprincipal+"', '"+escrow+"', '"+loanbalance+"', '"+escrowbalance+"')";

						if(id){
							sql = "UPDATE transactions SET account_name = '"+account_name+"', contact_person = '"+contact_person+"', type = '"+type+"', date = '"+date+"', amount = '"+amount+"', entered_by = '"+entered_by+"', comments = '"+comments+"', add_to_home_cost = '"+add_to_home_cost+"', add_to_warranty= '"+add_to_warranty+"', debit = '"+debit+"', house_id = '"+house_id+"' , product_name = '"+product_name+"' , warranty_id = '"+warranty_id+"', principal= '"+principal+"', interest= '"+interest+"', extraprincipal='"+extraprincipal+"', escrow='"+escrow+"', loanbalance='"+loanbalance+"', escrowbalance='"+escrowbalance+"' ";
				
							if(receipt) {
								sql += ", receipt = '"+receipt+"'";
							}
				
							sql += " where id = '"+id+"'";
						}
						
						con.query(sql, function (err, transactions) {
							if (err) {
								res.send(
									result.response(
										500,
										err,
										"OOPS, Something went wrong !, Please try again"
									)
								);
							} else {


								var sql = "SELECT transactions.id, account_name, date, contact_person, type, amount, comments,receipt, created_at, entered_by, contacts.groupname,contacts.companyname From transactions INNER JOIN contacts ON transactions.account_name = contacts.id where is_deleted = 0 and transactions.house_id='"+req.body.house_id+"'";
								con.query(sql, function (err, transactions) {
									if (err) {
										res.send(
											result.response(
											500,
											err,
											"OOPS, Something went wrong !, Please try again"
											)
										);
									} else {



										/**Reducing Amount from Escrow Amount */
										sql =  "SELECT * FROM loan WHERE escrowPayee='"+contact_person+"'";
										con.query(sql, function (err, escrowAmount) {
											if (err) {
												res.send(
													result.response(
													500,
													err,
													"OOPS, Something went wrong !, Please try again"
													)
												);
											} else {
												let escrow = 0
												if(escrowAmount[0] && escrowAmount[0][escrowamount]){
													escrow = parseInt(removeCommas(escrowAmount[0][escrowamount])) - parseInt(removeCommas(amount));
												}
												
												sql = "UPDATE loan SET escrowamount='"+escrow+"' where escrowPayee='"+contact_person+"'";
												con.query(sql, function (err, loan) {
													if (err) {
														res.send(
															result.response(
																500,
																err,
																"OOPS, Something went wrong !, Please try again"
															)
														);
													}
												});
											}
										});



										/**Complete */
										let transactionData = [...transactions];
										var sql = "SELECT loan.lname, paymentdate as date, c.contactperson as contact_person, lt.totalpayment as amount, loan.additionaldetails as comments, c.groupname,c.companyname, 'payment' as type, lt.entry_date as created_at,lt.entered_by, '*' as ltransaction From loan INNER JOIN loantransaction as lt on loan.id = lt.loan_id INNER JOIN contacts as c ON loan.lname = c.id where loan.house_id='"+req.body.house_id+"'";
										con.query(sql, function (err, loanTransaction) {
											if (err) {
												res.send(
													result.response(
														500,
														err,
														"OOPS, Something went wrong !, Please try again"
													)
												);
											}else {	
												console.log("Test.........................")
												transactionData = [...transactionData, ...loanTransaction]
												res.send(result.response(200, transactionData, "Transaction Added"));
											}
										});

										// if(id) {
										// 	res.send(
										// 		result.response(
										// 			200,
										// 			transactions,
										// 			"Updated successfully!"
										// 		)
										// 	);
										// } else {
										// 	res.send(
										// 		result.response(
										// 			200,
										// 			transactions,
										// 			"Transaction added Successfiully!"
										// 		)
										// 	);
										// }
									}
								});
							}
						});


					}
				});
			}
		}else{
			
			sql = "INSERT INTO transactions (account_name, contact_person, type, date, amount, entered_by, comments, receipt, add_to_home_cost, add_to_warranty, debit, house_id, principal, interest, extraprincipal, escrow, loanbalance, escrowbalance) VALUES ('"+account_name+"', '"+contact_person+"', '"+type+"', '"+date+"', '"+amount+"', '"+entered_by+"','"+comments+"', '"+receipt+"', '"+add_to_home_cost+"', '"+add_to_warranty+"', '"+debit+"', '"+house_id+"', '"+principal+"', '"+interest+"', '"+extraprincipal+"', '"+escrow+"', '"+loanbalance+"', '"+escrowbalance+"')";

			if(id){
				sql = "UPDATE transactions SET account_name = '"+account_name+"', contact_person = '"+contact_person+"', type = '"+type+"', date = '"+date+"', amount = '"+amount+"', entered_by = '"+entered_by+"', comments = '"+comments+"', add_to_home_cost = '"+add_to_home_cost+"', add_to_warranty= '"+add_to_warranty+"', debit = '"+debit+"', house_id = '"+house_id+"', principal= '"+principal+"', interest= '"+interest+"', extraprincipal='"+extraprincipal+"', escrow='"+escrow+"', loanbalance='"+loanbalance+"', escrowbalance='"+escrowbalance+"'";

				if(receipt) {
					sql += ", receipt = '"+receipt+"'";
				}

				sql += " where id = '"+id+"'";
			}
			
			con.query(sql, function (err, transactions) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else {
					var sql = "SELECT transactions.id, account_name, date, contact_person, type, amount, comments,receipt, created_at, entered_by, contacts.groupname,contacts.companyname From transactions INNER JOIN contacts ON transactions.account_name = contacts.id where is_deleted = 0 and transactions.house_id='"+req.body.house_id+"'";
					con.query(sql, function (err, transactions) {
						if (err) {
							res.send(
								result.response(
								500,
								err,
								"OOPS, Something went wrong !, Please try again"
								)
							);
						} else {
								/**Reducing Amount from Escrow Amount */
								sql =  "SELECT * FROM loan WHERE escrowPayee='"+contact_person+"'";
								con.query(sql, function (err, escrowAmount) {
									if (err) {
										res.send(
											result.response(
											500,
											err,
											"OOPS, Something went wrong !, Please try again"
											)
										);
									} else {
										let escrow = 0;
										if(escrowAmount[0] && escrowAmount[0]["escrowamount"]){
											escrow= parseInt(removeCommas(escrowAmount[0]["escrowamount"])) - parseInt(removeCommas(amount));
										}
										sql = "UPDATE loan SET escrowamount='"+escrow+"' where escrowPayee='"+contact_person+"'";
										
										con.query(sql, function (err, loan) {
											if (err) {
												res.send(
													result.response(
														500,
														err,
														"OOPS, Something went wrong !, Please try again"
													)
												);
											}
										});
									}
								});
								/**Complete */

								let transactionData = [];
								var sql = "SELECT loan.lname, paymentdate as date, c.contactperson as contact_person, lt.totalpayment as amount, loan.additionaldetails as comments, c.groupname,c.companyname, 'payment' as type, lt.entry_date as created_at,lt.entered_by, '*' as ltransaction From loan INNER JOIN loantransaction as lt on loan.id = lt.loan_id INNER JOIN contacts as c ON loan.lname = c.id where loan.house_id='"+req.body.house_id+"'";
								con.query(sql, function (err, loanTransaction) {
									if (err) {
										res.send(
											result.response(
												500,
												err,
												"OOPS, Something went wrong !, Please try again"
											)
										);
									}else {	
										transactionData = [...transactions, ...loanTransaction]
										res.send(result.response(200, transactionData, "Home transaction Details"));
									}
								});

							// if(id) {
							// 	res.send(
							// 		result.response(
							// 			200,
							// 			transactions,
							// 			"Updated successfully!"
							// 		)
							// 	);
							// } else {

							// 	res.send(
							// 		result.response(
							// 			200,
							// 			transactions,
							// 			"Transaction added Successfiully!"
							// 		)
							// 	);
							// }
						}
					});
				}
			});
		}

	});
});

const removeCommas = (nStr) =>{
	nStr = nStr.toString()
	var data = nStr.split(",") 
	data = data.join("")
	return data;
}


/**
 * Get single Transaction
 */
 router.post("/getsingletransaction", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			if(req.body.delete == "doc") {
				var sql = "select receipt from transactions where id = '"+req.body.id+"'";
				con.query(sql, function (err, transaction) {
					if (err) {
						res.send(
							result.response(
								500,
								err,
								"OOPS, Something went wrong !, Please try again"
							)
						);
					} else if (transaction.length > 0) {
						let path = transaction[0]['receipt']
						// path = "public\\files\\" + path;
						removeFile(path);
					}
				});

				sql = "Update transactions set receipt = '' where id = '"+req.body.id+"'";
				con.query(sql, function (err, transactions) {
					if(err) {
						res.send(
							result.response(
						  		500,
						  		err,
						  		"OOPS, Something went wrong !, Please try again"
							)
					  	);
					} else if (transactions.length === 0) {
					  	res.send(
							result.response(
						  		404,
						  		{},
						  		"Transaction does not found !"
							)
					  	);
					}
				});
			}
			var sql = "SELECT * From transactions where id='"+req.body.id+"'";
			con.query(sql, function (err, transactions) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (transactions.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Transaction does not found !"
						)
					);
				} else {
					res.send(result.response(200, transactions, "Transaction Details"));
				}
			});
		});
	}
});


  /**
 * Get Home Transaction
 */
 router.post("/gethometransactions", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT transactions.id, account_name, date, contact_person, type, amount, comments,receipt, created_at, entered_by, contacts.groupname,contacts.companyname From transactions INNER JOIN contacts ON transactions.account_name = contacts.id where is_deleted = 0 and transactions.house_id='"+req.body.house_id+"'";
			
			con.query(sql, function (err, transactions) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else {
					let transactionData = [];
					var sql = "SELECT loan.lname, paymentdate as date, c.contactperson as contact_person, lt.totalpayment as amount, loan.additionaldetails as comments, c.groupname,c.companyname, 'payment' as type, lt.entry_date as created_at,lt.entered_by, '*' as ltransaction From loan INNER JOIN loantransaction as lt on loan.id = lt.loan_id INNER JOIN contacts as c ON loan.lname = c.id where loan.house_id='"+req.body.house_id+"'";
					con.query(sql, function (err, loanTransaction) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						}else {	
							transactionData = [...transactions, ...loanTransaction]
							res.send(result.response(200, transactionData, "Home transaction Details"));
						}
					});

					//res.send(result.response(200, transactions, "Home transaction Details"));
				
				}
			});
		});
	}
});

// * Get All Transaction Details
//  */
 router.post("/gettransactionsAllData", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	}else
	{	con.connect(function(err) {
		// var sql = "SELECT transactions.id, account_name, is_deleted,date, contact_person, type, amount, comments,receipt, created_at, entered_by, contacts.groupname,contacts.companyname From transactions INNER JOIN contacts ON transactions.account_name = contacts.id where is_deleted = 0 and transactions.house_id='"+req.body.house_id+"'";
		let transactionAllData = [];
		var sql = "SELECT * From transactions order by id desc"
		con.query(sql, function (err, transactions) {
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
				
				transactionAllData = [...transactions]
				res.send(result.response(200, transactions, "Transaction All Details"));
				
			}
		});
	})}
});

/**
 * Delete single Transaction
 */
 router.post("/delete", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let deleted_date = month + "/" + date + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
        let deleted_by = req.body.deleted_by;

		con.connect(function(err) {
			var sql = "update transactions set deleted_date = '" + deleted_date + "', deleted_by= '"+ deleted_by +"', is_deleted=1 where id='"+req.body.id+"'";
			con.query(sql, function (err, transactions) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (transactions.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Transactions does not found !"
						)
					);
				} else {
					var sql = "SELECT id, account_name, date, contact_person, type, amount, comments,receipt, created_at, entered_by From transactions where is_deleted = 0 and house_id='"+req.body.house_id+"'";
					con.query(sql, function (err, transactions) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else if (transactions.length === 0) {
							res.send(
								result.response(
									404,
									{},
									"Transaction does not found !"
								)
							);
						} else {
						
							res.send(result.response(200, transactions, "Transaction deleted successfully!"));
						}
					});
				}
			});
		});
	}
});
/**
 * Undelete single Transaction
 */
 router.post("/undelete", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
     
       
		con.connect(function(err) {
			var sql = "update transactions set is_deleted=0 where id='"+req.body.id+"'";
			con.query(sql, function (err, transactions) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (transactions.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Transactions does not found !"
						)
					);
				} else {
					// var sql = "SELECT id, account_name, date, contact_person, type, amount, comments,receipt, created_at, entered_by From transactions where is_deleted = 1 and house_id='"+req.body.house_id+"'";
					let transactionAllData = [];
					var sql = "SELECT * From transactions order by id desc"
					con.query(sql, function (err, transactions) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else if (transactions.length === 0) {
							res.send(
								result.response(
									404,
									{},
									"Transaction does not found !"
								)
							);
						} else {
							transactionAllData = [...transactions]
							res.send(result.response(200, transactionAllData,"Transaction Undeleted successfully!"));
						}
					});
				}
			});
		});
	}
});

module.exports = router;