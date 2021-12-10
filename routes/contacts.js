var result = require("./response");
const router = require("express").Router();
const con = require("./config");

/**
 * Create Contacts
 */
router.post("/", async (req, res) => {
	console.log("req",req)
	// id, groupname, contactperson, landline, email, companyname, address, mono, url, comment, add_to_home_cost, transaction_type, transaction_amount, auto_post, posting_frequency, posting_date, house_id, streetName, city, state, country, houseno
	let id = req.body.id; 
	let groupname = req.body.groupname;   
	let contactperson = req.body.contactperson;  
	let phone2 = req.body.phone2;
	let phonetype1 = req.body.phonetype1; 
	let phonetype2 = req.body.phonetype2; 
	let email = req.body.email;  
	let companyname = req.body.companyname; 
	let address = req.body.address;  
	let phone1 = req.body.phone1;  
	let url = req.body.url;  
	let comment = req.body.comment;  
	let house_id = req.body.house_id;
	let add_to_home_cost = req.body.add_to_home_cost; 
	let transaction_type = req.body.transaction_type;
	let transaction_amount = req.body.transaction_amount;
	let auto_post = req.body.auto_post;
	let posting_frequency = req.body.posting_frequency;
	let posting_date = req.body.posting_date;
	let streetName = req.body.street;
	let city = req.body.city;
	let state = req.body.state;
	let country =req.body.country;
	let houseno =req.body.houseno;
	let zipcode =req.body.zipcode;


    con.connect(function(err) {
        var sql = "INSERT INTO contacts (groupname, contactperson, phone2, phonetype1, phonetype2, email, companyname, address, phone1, url, comment, house_id, add_to_home_cost, transaction_type, transaction_amount, auto_post, posting_frequency, posting_date, streetName, city, state, country, houseno, zipcode) VALUES ('"+groupname+"', '"+contactperson+"', '"+phone2+"','"+phonetype1+"','"+phonetype2+"','"+email+"', '"+companyname+"', '"+address+"','"+phone1+"', '"+url+"', '"+comment+"', '"+house_id+"', '"+add_to_home_cost+"', '"+transaction_type+"', '"+transaction_amount+"', '"+auto_post+"', '"+posting_frequency+"', '"+posting_date+"', '"+streetName+"', '"+city+"', '"+state+"', '"+country+"', '"+houseno+"', '"+zipcode+"')";
		console.log("abc:",sql)

        if(id){
            sql = "UPDATE contacts SET groupname = '"+groupname+"', contactperson = '"+contactperson+"', phone2 = '"+phone2+"', phonetype1 = '"+phonetype1+"',phonetype2 = '"+phonetype2+"' , email = '"+email+"', companyname = '"+companyname+"', address = '"+address+"', phone1 = '"+phone1+"', url = '"+url+"', comment = '"+comment+"', house_id = '"+house_id+"', add_to_home_cost = '"+add_to_home_cost+"', transaction_type = '"+transaction_type+"', transaction_amount = '"+transaction_amount+"', auto_post = '"+auto_post+"', posting_frequency = '"+posting_frequency+"', posting_date = '"+posting_date+"', streetName='"+streetName+"', city='"+city+"', state='"+state+"', country ='"+country+"', houseno='"+houseno+"', zipcode='"+zipcode+"' where id = '"+id+"'";
        }
        con.query(sql, function (err, contacts) {
			console.log(contacts);
            if (err) {
                res.send(
                    result.response(
                    500,
                    err,
                    "OOPS, Something went wrong !, Please try again"
                    )
                );
            } else {
				if(id){
					sql =  "SELECT * FROM contacts where id='"+id+"'"
				}else{
					var sql =  "SELECT * FROM contacts WHERE ID = (SELECT MAX(ID) FROM contacts)"
				}
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
						if(id) {
							res.send(
								result.response(
								200,
								contacts,
								"Contact Updated Successfully!!"
								)
							); 
						} else {
							res.send(
								result.response(
								200,
								contacts,
								"Contact Added Successfully!!"
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
 * Get single Contacts
 */
 router.post("/getsinglecontact", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT * From contacts where id='"+req.body.id+"'";
			con.query(sql, function (err, contacts) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (contacts.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Contact does not found !"
						)
					);
				} else {
					res.send(result.response(200, contacts, "Contact Details"));
				}
			});
		});
	}
  });


  /**
 * Get Home Contacts
 */
 router.post("/gethomecontacts", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT * From contacts where house_id='"+req.body.house_id+"'";
			con.query(sql, function (err, contacts) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (contacts.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"contacts does not found !"
						)
					);
				} else {
					res.send(result.response(200, contacts, "Home contacts Details"));
				}
			});
		});
	}
});

  /**
 * Get Home Contacts for transaction
 */
   router.post("/gethomecontactsfortransaction", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT * From contacts where house_id='"+req.body.house_id+"'";
			con.query(sql, function (err, contacts) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (contacts.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"contacts does not found !"
						)
					);
				} else {
					res.send(result.response(200, contacts, "Home contacts Details"));
				}
			});
		});
	}
});

/**
 * Delete Contact
 */
router.post("/delete", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "Delete from contacts where id = '"+req.body.id+"'";
			con.query(sql, function (err, contacts) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (contacts.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"contacts does not found !"
						)
					);
				} else {
					var sql = "SELECT * From contacts where house_id='"+req.body.house_id+"'";
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
							res.send(result.response(200, contacts, "Contact deleted successfully!"));
						}
					});
				}
			});
		});
	}
});


  /**
 * Get Home Contacts for transaction
 */
   router.post("/getgroup", async (req, res) => {
	   let house_id = req.body.house_id ? req.body.house_id : '-1';
	con.connect(function(err) {
		var sql = "SELECT * FROM contactgroup where house_id is NULL or house_id = '" +house_id+"'";
		con.query(sql, function (err, group) {
			if (err) {
				res.send(
					result.response(
						500,
						err,
						"OOPS, Something went wrong !, Please try again"
					)
				);
			} else {
				res.send(result.response(200, group, "Home contacts Details"));
			}
		});
	});
});



router.post("/addgroup", async (req, res) => {
//id, subgroup, group
   let id = req.body.id; 
   let subgroup = req.body.subgroup;   
   let group = req.body.group;
   let house_id = req.body.house_id;
  
	 con.connect(function(err) {

		 var sql =  "INSERT INTO contactgroup (groupname, subgroup, house_id) VALUES ('"+group+"', '"+subgroup+"', '"+house_id+"')";
		 console.log(sql)
 
		 if(id){
			 sql = "UPDATE contactgroup SET groupname = '"+group+"', subgroup = '"+subgroup+"'  where id = '"+id+"'";
		 }
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
				 sql =  "SELECT * FROM contactgroup where house_id is NULL or house_id = '" +house_id+"'";
				 console.log(sql);
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
						 res.send(
							 result.response(
							 200,
							 contacts,
							 "Created Successfiully !"
							 )
						 );  
					 }
				 });
			 }
		 });
	 });
 });



module.exports = router;
