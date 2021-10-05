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
 * Create Lease
*/
router.post("/", upload.single("document"), async (req, res) => {
	let id = req.body.id; 
	let lease_begin = req.body.lease_begin;
	let lease_end = req.body.lease_end;
	let frequency = req.body.frequency;
	let rent = req.body.rent;
	let rent_due_by = req.body.rent_due_by; 
	let rental_insurance = req.body.rental_insurance;
    let tenant_name1 = req.body.tenant_name1;
	let tenant_email1 = req.body.tenant_email1;
	let tenant_phone1 = req.body.tenant_phone1;
    let tenant_name2 = req.body.tenant_name2;
	let tenant_email2 = req.body.tenant_email2;
	let tenant_phone2 = req.body.tenant_phone2;
    let people = req.body.people;
	let lease_amount = req.body.lease_amount;
    let pets = req.body.pets;
    let deposit = req.body.deposit;
    let renewed = req.body.renewed;
	let lease_date = req.body.lease_date;
    let realtor_name = req.body.realtor_name;
	let realtor_phone = req.body.realtor_phone;
	let realtor_email = req.body.realtor_email;
    let hmo_space = req.body.hmo_space;
    let space_description = req.body.space_description;
    let comment = req.body.comment;
    let document = req.body.document;
	let house_id = req.body.house_id;
	

	con.connect(function(err) {
        // if (req.file) {
        //     document = req.file.path;
        // }

		var sql = "INSERT INTO lease (lease_begin, lease_end, frequency, rent, rent_due_by, rental_insurance, tenant_name1, document, tenant_email1, tenant_phone1, tenant_name2, tenant_email2, tenant_phone2, people,lease_amount, pets, deposit, renewed, lease_date, realtor_name, realtor_phone, realtor_email, hmo_space, space_description, comment, house_id) VALUES ('"+lease_begin+"', '"+lease_end+"', '"+frequency+"', '"+rent+"', '"+rent_due_by+"', '"+rental_insurance+"','"+tenant_name1+"','"+document+"', '"+tenant_email1+"', '"+tenant_phone1+"', '"+tenant_name2+"', '"+tenant_email2+"', '"+tenant_phone2+"', '"+people+"','"+lease_amount+"','"+pets+"','"+deposit+"', '"+renewed+"', '"+lease_date+"',  '"+realtor_name+"', '"+realtor_phone+"', '"+realtor_email+"', '"+hmo_space+"', '"+space_description+"', '"+comment+"', '"+house_id+"')";

		if(id){
			sql = "UPDATE lease SET lease_begin = '"+lease_begin+"', lease_end = '"+lease_end+"', frequency = '"+frequency+"', rent = '"+rent+"', rent_due_by = '"+rent_due_by+"', rental_insurance = '"+rental_insurance+"', tenant_name1 = '"+tenant_name1+"', tenant_email1 = '"+tenant_email1+"', tenant_phone1= '"+tenant_phone1+"', tenant_name2 = '"+tenant_name2+"', tenant_email2 = '"+tenant_email2+"', tenant_phone2 = '"+tenant_phone2+"', people = '"+people+"',lease_amount = '"+lease_amount+"', pets = '"+pets+"', deposit = '"+deposit+"', renewed = '"+renewed+" ', lease_date ='"+lease_date+" ', realtor_name = '"+realtor_name+"', realtor_phone = '"+realtor_phone+"', realtor_email = '"+realtor_email+"', hmo_space = '"+hmo_space+"', space_description = '"+space_description+"', comment = '"+comment+"', house_id = '"+house_id+"'";

			if(document) {
				sql += ", document = '"+document+"'";
			}

			sql += " where id = '"+id+"'";
		}
		
		con.query(sql, function (err, lease) {
			if (err) {
				res.send(
					result.response(
						500,
						err,
						"OOPS, Something went wrong !, Please try again"
					)
				);
			} else {
				var sql =  "SELECT * FROM lease WHERE ID = (SELECT MAX(ID) FROM lease)";
				if(id) {
					sql = "select * from lease where id = '" + id + "'";
				} 

                if(req.body.lastTab){
					sql =  "SELECT * FROM lease WHERE house_id='"+house_id+"'";
				}
				con.query(sql, function (err, lease) {
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
									lease,
									"Updated successfully!",
                                    lastTab
								)
							);
						} else {
							res.send(
								result.response(
									200,
									lease,
									"Lease added Successfiully!"
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
 * Get single Lease
 */
 router.post("/getsinglelease", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			if(req.body.delete == "doc") {
				var sql = "select document from lease where id = '"+req.body.id+"'";
				con.query(sql, function (err, lease) {
					if (err) {
						res.send(
							result.response(
								500,
								err,
								"OOPS, Something went wrong !, Please try again"
							)
						);
					} else if (lease.length > 0) {
						let path = lease[0]['document']
						// path = "public\\files\\" + path;
						removeFile(path);
					}
				});

				sql = "Update lease set document = '' where id = '"+req.body.id+"'";
				con.query(sql, function (err, lease) {
					if(err) {
						res.send(
							result.response(
						  		500,
						  		err,
						  		"OOPS, Something went wrong !, Please try again"
							)
					  	);
					} else if (lease.length === 0) {
					  	res.send(
							result.response(
						  		404,
						  		{},
						  		"Lease does not found !"
							)
					  	);
					}
				});
			}
			var sql = "SELECT * From lease where id='"+req.body.id+"'";
			con.query(sql, function (err, lease) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (lease.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Lease does not found !"
						)
					);
				} else {
					res.send(result.response(200, lease, "Lease Details"));
				}
			});
		});
	}
});


  /**
 * Get Home Lease
 */
 router.post("/gethomelease", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT * From lease where  house_id='"+req.body.house_id+"'";
			con.query(sql, function (err, lease) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (lease.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Lease does not found !"
						)
					);
				} else {
					res.send(result.response(200, lease, "Home Lease Details"));
				}
			});
		});
	}
});


/**
 * Delete single Lease
 */
 router.post("/delete", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "select document from lease where id = '"+req.body.id+"'";
			con.query(sql, function (err, lease) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (lease.length > 0) {
					let path = lease[0]['document']
					// path = "public\\files\\" + path;
					removeFile(path);
				}
			});

			var sql = "delete from lease where id='"+req.body.id+"'";
			con.query(sql, function (err, lease) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (lease.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"lease does not found !"
						)
					);
				} else {
					var sql = "SELECT id, lease_begin, lease_end, rent, rent_due_by, rental_insurance From lease where  house_id='"+req.body.house_id+"'";
					con.query(sql, function (err, lease) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else if (lease.length === 0) {
							res.send(
								result.response(
									404,
									{},
									"Lease does not found !"
								)
							);
						} else {
							res.send(result.response(200, lease, "Lease deleted successfully!"));
						}
					});
				}
			});
		});
	}
});

module.exports = router;