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
 * Create Insurance
*/
router.post("/", upload.single("attachment"), async (req, res) => {
console.log("attachment22::",req.body.attachment)
	let id = req.body.id; 
	let provider = req.body.provider;
	let insurance_number = req.body.insurance_number;
	let effective_date = req.body.effective_date;
	let expiry_date = req.body.expiry_date;
	let premium = req.body.premium; 
	let provider_url = req.body.provider_url;
	let renewed = req.body.renewed;
	let attachments =  req.body.attachment;
	let company_name = req.body.company_name;
	let agent_name = req.body.agent_name;
	let contact_person = req.body.contact_person;
	let company_address = req.body.company_address;
	let company_phone = req.body.company_phone;
	let company_email = req.body.company_email;
	let provider_phone = req.body.provider_phone;
	let reminder_date = req.body.reminder_date;
	let reminder_phone = req.body.reminder_phone;
	let reminder_email = req.body.reminder_email;
	let reminder_alternate_email = req.body.reminder_alternate_email;
	let comments = req.body.comments;
	let status = req.body.status;
	let house_id = req.body.house_id;

	con.connect(function(err) {
        // if (req.body.attachment) {
        //     attachments = req.body.attachment;
        // }

		var sql = "INSERT INTO insurances (provider, insurance_number, provider_phone,effective_date, expiry_date, premium, provider_url, renewed, attachments, company_name, agent_name, contact_person,company_address, company_phone, company_email, reminder_date, reminder_phone, reminder_email, reminder_alternate_email, comments, status, house_id) VALUES ('"+provider+"', '"+insurance_number+"','"+provider_phone+"', '"+effective_date+"', '"+expiry_date+"', '"+premium+"', '"+provider_url+"','"+renewed+"', '"+attachments+"', '"+company_name+"', '"+agent_name+"', '"+contact_person+"', '"+company_address+"', '"+company_phone+"', '"+company_email+"', '"+reminder_date+"', '"+reminder_phone+"', '"+reminder_email+"', '"+reminder_alternate_email+"', '"+comments+"', '"+status+"', '"+house_id+"')";

		if(id){
			sql = "UPDATE insurances SET provider = '"+provider+"', insurance_number = '"+insurance_number+"', effective_date = '"+effective_date+"', expiry_date = '"+expiry_date+"', premium = '"+premium+"', provider_url = '"+provider_url+"', renewed = '"+renewed+"', company_name = '"+company_name+"', agent_name = '"+agent_name+"',contact_person = '"+contact_person+"', company_address = '"+company_address+"', company_phone = '"+company_phone+"', company_email = '"+company_email+"', reminder_date = '"+reminder_date+"', provider_phone = '"+provider_phone+"',reminder_phone = '"+reminder_phone+"', reminder_email = '"+reminder_email+"', reminder_alternate_email = '"+reminder_alternate_email+"', comments = '"+comments+"', status = '"+status+"'";

			if(attachments) {
				sql += ", attachments = '"+attachments+"'";
			}

			sql += " where id = '"+id+"'";
		}
		
		con.query(sql, function (err, insurances) {
			if (err) {
				res.send(
					result.response(
						500,
						err,
						"OOPS, Something went wrong !, Please try again"
					)
				);
			} else {
				var sql = "";
				if(id) {
					sql = "SELECT * FROM insurances where id = '" + id + "'";
				} else {
					sql =  "SELECT * FROM insurances WHERE house_id='"+house_id+"'";
				}

				if(req.body.lastTab){
					sql =  "SELECT * FROM insurances WHERE house_id='"+house_id+"'";
				}
				con.query(sql, function (err, insurances) {
					if (err) {
						res.send(
							result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
							)
						);
					} else {
						var lastTab = false; 
                        if(id){
                          if(req.body.lastTab){
                            lastTab =  true;
                          }
							res.send(
								result.response(
									200,
									insurances,
									"Updated successfully!",
									lastTab
								)
							);
						} else {
							res.send(
								result.response(
									200,
									insurances,
									"Insurance added Successfiully!"
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
 * Get single Insurance
 */
 router.post("/getsingleinsurance", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			if(req.body.delete === "doc") {
				var sql = "select attachments from insurances where id = '"+req.body.id+"'";
				con.query(sql, function (err, insurnce) {
					if (err) {
						res.send(
							result.response(
								500,
								err,
								"OOPS, Something went wrong !, Please try again"
							)
						);
					} else if (insurnce.length > 0) {
						let path = insurnce[0]['attachments']
						// path = "public\\files\\" + path;
						removeFile(path);
					}
				});

                sql = "Update insurances set attachments = '' where id = '"+req.body.id+"'";
				con.query(sql, function (err, insurances) {
					if(err) {
						res.send(
							result.response(
						  		500,
						  		err,
						  		"OOPS, Something went wrong !, Please try again"
							)
					  	);
					} else if (insurances.length === 0) {
					  	res.send(
							result.response(
						  		404,
						  		{},
						  		"Insurance does not found !"
							)
					  	);
					}
				});
            }

			var sql = "SELECT * From insurances where id='"+req.body.id+"'";
			con.query(sql, function (err, insurances) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (insurances.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Insurance does not found !"
						)
					);
				} else {
					res.send(result.response(200, insurances, "Insurance Details"));
				}
			});
		});
	}
});


  /**
 * Get Home Insurances
 */
 router.post("/gethomeinsurances", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT * From insurances where house_id='"+req.body.house_id+"'";
			con.query(sql, function (err, insurances) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (insurances.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Insurances does not found !"
						)
					);
				} else {
					res.send(result.response(200, insurances, "Home insurances Details"));
				}
			});
		});
	}
});


/**
 * Delete single Insurance
 */
 router.post("/deletesingleinsurance", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "select attachments from insurances where id = '"+req.body.id+"'";
			con.query(sql, function (err, insurnce) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (insurnce.length > 0) {
					let path = insurnce[0]['attachments'].substr(11);
					// path = "public\\files\\" + path;
					removeFile(path);
				}
			});

			var sql = "delete From insurances where id='"+req.body.id+"'";
			con.query(sql, function (err, insurances) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (insurances.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Insurance does not found !"
						)
					);
				} else {
					var sql = "SELECT id, provider, insurance_number, effective_date, expiry_date, premium, provider_url, renewed, status, reminder_date From insurances where house_id='"+req.body.house_id+"'";
					con.query(sql, function (err, insurances) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else if (insurances.length === 0) {
							res.send(
								result.response(
									404,
									{},
									"Insurances does not found !"
								)
							);
						} else {
							res.send(result.response(200, insurances, "Home insurance deleted successfully!"));
						}
					});
				}
			});
		});
	}
});

module.exports = router;