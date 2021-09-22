var result = require("./response");
const router = require("express").Router();
const multer = require("multer");
const con = require("./config");
const fs = require("fs");

const removeFile = (path) => {
    fs.unlink(path, (err) => {
        if(err) {
            console.log(err);
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
router.post("/amortization", async (req, res) => {
	let data = req.body;
	//id, pmtno, paymentdate, beginingdate, scheduledpayment, extrapayment, totalpayment, principal, interest, endingbalance, cumulativeinterest
	con.connect(function(err) {
		var sql = "SELECT * From amortization where loan_id='"+data[0].loan_id+"'";
		con.query(sql, function (err, amortization) {
			if (err) {
				res.send(
					result.response(
						500,
						err,
						"OOPS, Something went wrong !, Please try again"
					)
				);
			} else if (loan.length === 0) {
				for(let i=0; i<data.length; i++){
					let pmtno = data[i].month;
					let paymentdate =data[i].paymentdate;
					let beginingamount =  data[i].loanamount;
					let scheduledpayment = data[i].scheduledpayment;
					let extrapayment = data[i].extra;
					let totalpayment = data[i].payment;
					let principal = data[i].principal;
					let interest = data[i].interest;
					let endingbalance = data[i].endingloan;
					let cumulativeinterest = data[i].cumulativeinterest;
					let loan_id = data[i].loan_id;
		
					var sql = "INSERT INTO amortization (pmtno, paymentdate, beginingamount, scheduledpayment, extrapayment, totalpayment, principal, interest, endingbalance,cumulativeinterest,loan_id) VALUES ('"+pmtno+"','"+paymentdate+"', '"+beginingamount+"', '"+scheduledpayment+"', '"+extrapayment+"', '"+totalpayment+"', '"+principal+"', '"+interest+"', '"+endingbalance+"', '"+cumulativeinterest+"', '"+loan_id+"')";
					con.query(sql, function (err, loan) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else {
							res.send(result.response(200, loan, "Amortization"));	
						}
					});
				}
			}else {
				res.send(result.response(200, amortization, "Already added"));	
			}
		});
		
		
		
		
		
		
		
		
		
	
	})
});

	
/**
 * Create Transaction
 */
router.post("/transaction", async (req, res) => {
	let data = req.body;
	//id, pmtno, paymentdate, beginingamount, scheduledpayment, extrapayment, totalpayment, principal, interest, endingbalance, cumulativeinterest, loan_id, account_name, contacts_id, comment, entered_by
	con.connect(function(err) {
		console.log(data)
		if(data[0].loan_id || data[0].contacts_id){
			if(data[0].contacts_id){
				var sql = "Delete from loantransaction where contacts_id = '"+data[0].contacts_id+"'";
			}else{
				var sql = "Delete from loantransaction where loan_id = '"+data[0].loan_id+"'";
			}
			console.log("-------------------------------")
			console.log(sql)
			con.query(sql, function (err, loan) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				}else{
					if(data[0].delete == true){
						res.send(result.response(200, [], "Loan Transaction Details"));
					}
				}
			});
		}
		
		

		for(let i=0; i<data.length; i++){
			let pmtno = data[i].month;
			let paymentdate =data[i].paymentdate;
			let beginingamount =  data[i].loanamount;
			let scheduledpayment = data[i].scheduledpayment;
			let extrapayment = data[i].extra;
			let totalpayment = data[i].payment;
			let principal = data[i].principal;
			let interest = data[i].interest;
			let endingbalance = data[i].endingloan;
			let cumulativeinterest = data[i].cumulativeinterest;
			let loan_id = data[i].loan_id;
			let account_name = data[i].account_name ?  data[i].account_name : "";
			let contacts_id = data[i].contacts_id ? data[i].contacts_id : "";
			let comment = data[i].comment ? data[i].comment : ""
			let entered_by = data[i].entered_by ? data[i].entered_by : ""
			let entry_date = new Date();
		

			
			var sql = "INSERT INTO loantransaction (pmtno, paymentdate, beginingamount, scheduledpayment, extrapayment, totalpayment, principal, interest, endingbalance,cumulativeinterest,loan_id, account_name, contacts_id, comment, entered_by, entry_date) VALUES ('"+pmtno+"','"+paymentdate+"', '"+beginingamount+"', '"+scheduledpayment+"', '"+extrapayment+"', '"+totalpayment+"', '"+principal+"', '"+interest+"', '"+endingbalance+"', '"+cumulativeinterest+"', '"+loan_id+"',  '"+account_name+"',  '"+contacts_id+"',  '"+comment+"', '"+entered_by+"', '"+entry_date+"')";
			con.query(sql, function (err, loan) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else {
					if(i == data.length-1){
						if(contacts_id){
							var sql = "SELECT * From loantransaction where contacts_id='"+contacts_id+"'";
						}else{
							var sql = "SELECT * From loantransaction where loan_id='"+loan_id+"'";
						}
						
						con.query(sql, function (err, loan) {
							if (err) {
								res.send(
									result.response(
										500,
										err,
										"OOPS, Something went wrong !, Please try again"
									)
								);
							}else {
								sql = "UPDATE loan SET escrowamount='"+endingbalance+"' where escrowPayee='"+data[0]['account_name']+"'";
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
								res.send(result.response(200, loan, "Loan Transaction Details"));
							}
						});
					}
					
				}
			});
		}
	})
});

/** Get transaction*/
router.post("/gettransaction", async (req, res) => {
	con.connect(function(err) {
		if(req.body.loan_id){
			var sql = "SELECT * From loantransaction where loan_id='"+req.body.loan_id+"'";
		}else{
			var sql = "SELECT * From loantransaction where contacts_id='"+req.body.contacts_id+"'";
		}
	
		con.query(sql, function (err, loan) {
			if (err) {
				res.send(
					result.response(
						500,
						err,
						"OOPS, Something went wrong !, Please try again"
					)
				);
			}else {
				res.send(result.response(200, loan, "Loan Transaction Details"));
			}
		});
	});
});
/**Mortgage Loan Transaction Details */
/** Get transaction*/
router.post("/getMortgageTransaction", async (req, res) => {
	con.connect(function(err) {
		var sql = "SELECT loan.id, loantype, lname, lcontactperson, laddress, lphno, lemail, lurl, purchaseprice, downpayment, loanamount, rateofinterest, loanterm, loannumber, escrow, mortgage, loanbegindate, propertytax, document, additionaldetails, loanclosuredate, status, escrowPayee, propertytaxPayee, loan.house_id, pmtno, paymentdate, beginingamount, scheduledpayment, extrapayment, totalpayment, principal, interest, endingbalance, cumulativeinterest, loan_id, contacts.groupname,contacts.companyname From loan INNER JOIN loantransaction as lt on loan.id = lt.loan_id INNER JOIN contacts ON loan.lname = contacts.id where loan.loantype = 'Mortgage' AND loan.house_id='"+req.body.house_id+"'";
		//='"+req.body.loan_id+"'";
		con.query(sql, function (err, loan) {
			if (err) {
				res.send(
					result.response(
						500,
						err,
						"OOPS, Something went wrong !, Please try again"
					)
				);
			}else {
				res.send(result.response(200, loan, "Loan Transaction Details"));
			}
		});
	});
});




/**
 * Delete Transaction
 */
 router.post("/deletetransaction", async (req, res) => {
	if (!req.body.loan_id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "Delete from loantransaction where loan_id = '"+req.body.loan_id+"'";
			con.query(sql, function (err, loan) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else{
					res.send(
						result.response(
							404,
							{},
							"Loan Transaction Deleted !"
						)
					);
				}
			});
		});
	}
});


/**
 * Create Loan
 */
router.post("/",upload.single("document"), async (req, res) => {
	console.log("document12::",req.body.document)
		//id, loantype, lname, lcontactperson, laddress, lphno, lemail, lurl, purchaseprice, downpayment, loanamount, rateofinterest, loanterm, loannumber, escrow, mortgage, loanbegindate, propertytax, document, additionaldetails, loanclosuredate, status, escrowPayee, propertytaxPayee, escrowamount, house_id, lcontact_id, escrowcontact_id, propertytaxcontact_id, renewal_maturity_date, renewal_intrest_rate
	let id = req.body.id;
	let loantype = req.body.loantype;
	let lname = req.body.lname;
	let lcontactperson = req.body.lcontactperson;
	let laddress = req.body.laddress;
	let lphno = req.body.lphno;
	let lemail = req.body.lemail;
	let lurl = req.body.lurl;
	let purchaseprice = req.body.purchaseprice;
	let downpayment = req.body.downpayment;
	let loanamount = req.body.loanamount;
	let rateofinterest = req.body.rateofinterest;
	let loanterm = req.body.loanterm;
	let loannumber = req.body.loannumber;
	let escrow = req.body.escrow;
	let mortgage = req.body.mortgage;
	let loanbegindate = req.body.loanbegindate;
	let propertytax = req.body.propertytax;
	let additionaldetails = req.body.additionaldetails;
	let loanclosuredate = req.body.loanclosuredate;
	let status = req.body.status;
	let house_id = req.body.house_id;
	let escrowPayee = req.body.escrowPayee;
	let propertytaxPayee = req.body.propertytaxPayee;
	let escrowamount = req.body.escrowamount;
	let renewal_maturity_date = req.body.renewal_maturity_date;
	let renewal_intrest_rate = req.body.renewal_intrest_rate;
	let document = req.body.document;
	
		con.connect(function(err) {
				// var document = "";
				// console.log(req.file);
				// if (req.file) {
				// 		document = req.file.path;
				// 	}
				
					var sql = "INSERT INTO loan (loantype, lname, lcontactperson, laddress, lphno, lemail, lurl, purchaseprice, downpayment, loanamount, rateofinterest, loanterm, loannumber, escrow, mortgage, loanbegindate, propertytax, document, additionaldetails, loanclosuredate, status, house_id, escrowPayee, propertytaxPayee, escrowamount, renewal_maturity_date, renewal_intrest_rate) VALUES ('"+loantype+"','"+lname+"', '"+lcontactperson+"', '"+laddress+"', '"+lphno+"', '"+lemail+"', '"+lurl+"', '"+purchaseprice+"', '"+downpayment+"', '"+loanamount+"', '"+rateofinterest+"', '"+loanterm+"', '"+loannumber+"', '"+escrow+"', '"+mortgage+"', '"+loanbegindate+"','"+propertytax+"','"+document+"','"+additionaldetails+"','"+loanclosuredate+"','"+status+"','"+house_id+"', '"+escrowPayee+"', '"+propertytaxPayee+"' , '"+escrowamount+"', '"+renewal_maturity_date+"', '"+renewal_intrest_rate+"')";

				if(id){
						if(document){
								sql = "UPDATE loan SET loantype= '"+loantype+"', lname= '"+lname+"', lcontactperson= '"+lcontactperson+"', laddress= '"+laddress+"', lphno= '"+lphno+"', lemail= '"+lemail+"', lurl= '"+lurl+"', purchaseprice= '"+purchaseprice+"', downpayment= '"+downpayment+"', loanamount= '"+loanamount+"', rateofinterest= '"+rateofinterest+"', loanterm= '"+loanterm+"', loannumber= '"+loannumber+"', escrow= '"+escrow+"', mortgage= '"+mortgage+"', loanbegindate= '"+loanbegindate+"', propertytax= '"+propertytax+"', document= '"+document+"', additionaldetails= '"+additionaldetails+"', loanclosuredate= '"+loanclosuredate+"', status= '"+status+"', house_id = '"+house_id+"', escrowPayee = '"+escrowPayee+"', propertytaxPayee = '"+propertytaxPayee+"', escrowamount='"+escrowamount+"', renewal_maturity_date ='"+renewal_maturity_date+"', renewal_intrest_rate = '"+renewal_intrest_rate+"' where id = '"+id+"'";
						}else{
								sql = "UPDATE loan SET loantype= '"+loantype+"', lname= '"+lname+"', lcontactperson= '"+lcontactperson+"', laddress= '"+laddress+"', lphno= '"+lphno+"', lemail= '"+lemail+"', lurl= '"+lurl+"', purchaseprice= '"+purchaseprice+"', downpayment= '"+downpayment+"', loanamount= '"+loanamount+"', rateofinterest= '"+rateofinterest+"', loanterm= '"+loanterm+"', loannumber= '"+loannumber+"', escrow= '"+escrow+"', mortgage= '"+mortgage+"', loanbegindate= '"+loanbegindate+"', propertytax= '"+propertytax+"', additionaldetails= '"+additionaldetails+"', loanclosuredate= '"+loanclosuredate+"', status= '"+status+"', house_id = '"+house_id+"', escrowPayee = '"+escrowPayee+"', propertytaxPayee = '"+propertytaxPayee+"', escrowamount='"+escrowamount+"', renewal_maturity_date ='"+renewal_maturity_date+"', renewal_intrest_rate = '"+renewal_intrest_rate+"' where id = '"+id+"'";
						}
					 
				}
				con.query(sql, function (err, loan) {
						if (err) {
								res.send(
										result.response(
										500,
										err,
										"OOPS, Something went wrong !, Please try again"
										)
								);
						} else {
								var sql =  "SELECT * FROM loan WHERE ID = (SELECT MAX(ID) FROM loan)";
								if(id){
									sql =  "SELECT * FROM loan WHERE ID = '"+id+"'";
								}
								if(req.body.lastTab){
									sql =  "SELECT * FROM loan WHERE house_id='"+house_id+"'";
								}
								con.query(sql, function (err, loan) {
										if (err) {
												res.send(
														result.response(
														500,
														err,
														"OOPS, Something went wrong !, Please try again"
														)
												);
										} else {

											/**Creating new contact for escrow payee */
											if(escrowPayee){
												console.log(escrowPayee);
												sql =  "SELECT * FROM contacts where contactperson='"+escrowPayee+"'"
												con.query(sql, function (err, contacts) {
													if (err) {
														res.send(
															result.response(
															500,
															err,
															"OOPS, Something went wrong !, Please try again"
															)
														);
													}else if (contacts.length === 0) {
														sql =  "SELECT * FROM contacts where id='"+parseInt(lname)+"'"
														con.query(sql, function (err, contacts) {
															if (err) {
																res.send(
																	result.response(
																	500,
																	err,
																	"OOPS, Something went wrong !, Please try again"
																	)
																);
															} else {
															
																var sql = "INSERT INTO contacts (groupname, contactperson, landline, email, companyname, address, mono, url, comment, house_id, add_to_home_cost, transaction_type, transaction_amount, auto_post, posting_frequency, posting_date, streetName, city, state, country, houseno) VALUES ('"+contacts[0].groupname+"', '"+escrowPayee+"', '"+contacts[0].landline+"', '"+contacts[0].email+"', '"+contacts[0].companyname+"', '"+contacts[0].address+"','"+contacts[0].mono+"', '"+contacts[0].url+"', '"+contacts[0].comment+"', '"+contacts[0].house_id+"', '"+contacts[0].add_to_home_cost+"', '"+contacts[0].transaction_type+"', '"+contacts[0].transaction_amount+"', '"+contacts[0].auto_post+"', '"+contacts[0].posting_frequency+"', '"+contacts[0].posting_date+"', '"+contacts[0].streetName+"', '"+contacts[0].city+"', '"+contacts[0].state+"', '"+contacts[0].country+"', '"+contacts[0].houseno+"')";
																con.query(sql, function (err, contact) {
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
													} 
												});
											}

									/**Creating new contact for escrow payee Complete*/

												var lastTab = false; 
												if(id){
													if(req.body.lastTab){
														lastTab =  true;
													}
													res.send(
															result.response(
															200,
															loan,
															"Updated successfully!",
															lastTab
															)
													);
												}else{
														res.send(
																result.response(
																200,
																loan,
																"Created Successfiully !"
																)
														);
												}
										}
								});
						}
				});

		});
});


/**
 * Get single Loan
 */

const queryFunc = (sql) =>{

}


 router.post("/getsingleloan", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			if(req.body.delete == "doc"){
				sql = "select document from loan where id = '"+req.body.id+"'";
				con.query(sql, function (err, loan) {
					if (err) {
						res.send(
							result.response(
								500,
								err,
								"OOPS, Something went wrong !, Please try again"
							)
						);
					} else if (loan.length > 0) {
						let path = loan[0]['document']
						// path = "public\\files\\" + path;
						 removeFile(path);
					} 
				});
				sql = "UPDATE loan SET document= '' where id='"+req.body.id+"'";
				con.query(sql, function (err, loan) {
					if(err) {
						res.send(
							result.response(
						  		500,
						  		err,
						  		"OOPS, Something went wrong !, Please try again"
							)
					  	);
					}
					 else if (loan.length === 0) {
					  	res.send(
							result.response(
						  		404,
						  		{},
						  		"Loan does not found !"
							)
					  	);
					}
				});
			}
			
			var sql = "SELECT * From loan where id='"+req.body.id+"'";
			con.query(sql, function (err, loan) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (loan.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Loan does not found !"
						)
					);
				} else {
					res.send(result.response(200, loan, "Loan Details"));
				}
			});
		});
	}
	});


/**
 * Get single Loan
 */
 router.post("/gethomeloans", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT loan.id, loantype, lname, lcontactperson, laddress, lphno, lemail, lurl, purchaseprice, downpayment, loanamount, rateofinterest, loanterm, loannumber, escrow, mortgage, loanbegindate, propertytax, document, additionaldetails, loanclosuredate, status, escrowPayee, propertytaxPayee, escrowamount, loan.house_id, lcontact_id, escrowcontact_id, propertytaxcontact_id, contacts.groupname,contacts.companyname From loan INNER JOIN contacts ON loan.lname = contacts.id where loan.house_id='"+req.body.house_id+"'";
			
			con.query(sql, function (err, loan) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (loan.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Loan does not found !"
						)
					);
				} else {
					res.send(result.response(200, loan, "Home Loans Details"));
				}
			});
		});
	}
});

/**
 * Delete Loan
 */
 router.post("/delete", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "select document from loan where id = '"+req.body.id+"'";
			con.query(sql, function (err, loan) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (loan.length > 0) {
					let path = loan[0]['document']
					// path = "public\\files\\" + path;
					removeFile(path);
				}
			});
			
			sql = "Delete from loan where id = '"+req.body.id+"'";
			con.query(sql, function (err, loan) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if(loan.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Loan does not found !"
						)
					);
				} else {
					sql = "SELECT id,loantype,lname,loannumber,loanamount,rateofinterest,loanterm,mortgage,propertytax,loanbegindate,loanclosuredate,status From loan where house_id='"+req.body.house_id+"'";
					con.query(sql, function (err, loan) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else if (loan.length === 0) {
							res.send(
								result.response(
									404,
									{},
									"Loan does not found !"
								)
							);
						} else {
							res.send(result.response(200, loan, "Loan deleted successfully!"));
						}
					});
				}
			});
		});
	}
});

module.exports = router;
