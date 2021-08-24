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
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
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
 * Create Warranty
*/
router.post("/", upload.single("InstalltionImage"), async (req, res) => {

	let id = req.body.id; 
	let product_name = req.body.product_name;
	let manufacturer_serial_no = req.body.manufacturer_serial_no;
	let model_type = req.body.model_type;
	let model_no = req.body.model_no;
	let color = req.body.color; 
	let product_price = req.body.product_price;
    let warranty_provider = req.body.warranty_provider;
    let contact_person = req.body.contact_person;
    let company_address = req.body.company_address;
    let phone_no = req.body.phone_no;
    let email = req.body.email;
    let website_url = req.body.website_url;
	let mfg_warranty_start_date = req.body.mfg_warranty_start_date;
	let mfg_warranty_end_date = req.body.mfg_warranty_end_date;
	let extended_warranty_start_date = req.body.extended_warranty_start_date;
	let extended_warranty_end_date = req.body.extended_warranty_end_date;
    let installation_date = req.body.installation_date;
    let installation_company_name = req.body.installation_company_name;
    let installed_by = req.body.installed_by;
    let contact_number = req.body.contact_number;
    let installation_charges = req.body.installation_charges;
    let comments = req.body.comments;
    let image = "";
    let house_id = req.body.house_id;

	con.connect(function(err) {
        if (req.file) {
            image = req.file.path;
        }
		var sql = "INSERT INTO warranty (product_name, manufacturer_serial_no, model_type, model_no, color, product_price, warranty_provider, contact_person, company_address, phone_no, email, website_url, mfg_warranty_start_date, image, mfg_warranty_end_date, extended_warranty_start_date, extended_warranty_end_date, installation_date, installation_company_name, installed_by, contact_number, installation_charges, comments, house_id) VALUES ('"+product_name+"', '"+manufacturer_serial_no+"', '"+model_type+"', '"+model_no+"', '"+color+"', '"+product_price+"', '"+warranty_provider+"', '"+contact_person+"', '"+company_address+"', '"+phone_no+"', '"+email+"', '"+website_url+"', '"+mfg_warranty_start_date+"', '"+image+"', '"+mfg_warranty_end_date+"', '"+extended_warranty_start_date+"', '"+extended_warranty_end_date+"', '"+installation_date+"', '"+installation_company_name+"', '"+installed_by+"', '"+contact_number+"', '"+installation_charges+"', '"+comments+"', '"+house_id+"')";

		if(id){
			sql = "UPDATE warranty SET product_name = '"+product_name+"', manufacturer_serial_no = '"+manufacturer_serial_no+"', model_type = '"+model_type+"', model_no = '"+model_no+"', color = '"+color+"', product_price = '"+product_price+"', warranty_provider = '"+warranty_provider+"', contact_person = '"+contact_person+"', company_address = '"+company_address+"', phone_no = '"+phone_no+"', email = '"+email+"', website_url = '"+website_url+"', mfg_warranty_start_date = '"+mfg_warranty_start_date+"', mfg_warranty_end_date = '"+mfg_warranty_end_date+"', extended_warranty_start_date = '"+extended_warranty_start_date+"', extended_warranty_end_date = '"+extended_warranty_end_date+"', installation_date = '"+installation_date+"', installation_company_name = '"+installation_company_name+"', installed_by = '"+installed_by+"', contact_number = '"+contact_number+"', installation_charges = '"+installation_charges+"', comments = '"+comments+"', house_id = '"+house_id+"'";

			if(image) {
				sql += ", image = '"+image+"'";
			}

			sql += " where id = '"+id+"'";
			console.log(sql)
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
			} else {
				var sql = "";
				if(id) {
					sql = "select * from warranty where id = '" + id + "'";
				} else {
					sql =  "SELECT * FROM warranty WHERE ID = (SELECT MAX(ID) FROM warranty)"
				}

				if(req.body.lastTab){
					sql =  "SELECT * FROM warranty WHERE house_id='"+house_id+"'";
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
					} else {
						var lastTab = false; 
                        if(id){
                          if(req.body.lastTab){
                            lastTab =  true;
                          }
							res.send(
								result.response(
									200,
									warranty,
									"Updated successfully!",
									lastTab
								)
							);
						} else {
							res.send(
								result.response(
									200,
									warranty,
									"Warranty added Successfiully!"
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
 * Get single Warranty
 */
 router.post("/getsinglewarranty", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			if(req.body.delete === "doc") {
				var sql = "select image from warranty where id = '"+req.body.id+"'";
				con.query(sql, function (err, warranty) {
					if (err) {
						res.send(
							result.response(
								500,
								err,
								"OOPS, Something went wrong !, Please try again"
							)
						);
					} else if (warranty.length > 0) {
						let path = warranty[0]['image'].substr(11);
						path = "public\\files\\" + path;
						removeFile(path);
					}
				});

                sql = "Update warranty set image = '' where id = '"+req.body.id+"'";
				con.query(sql, function (err, warranty) {
					if(err) {
						res.send(
							result.response(
						  		500,
						  		err,
						  		"OOPS, Something went wrong !, Please try again"
							)
					  	);
					} else if (warranty.length === 0) {
					  	res.send(
							result.response(
						  		404,
						  		{},
						  		"Warranty does not found !"
							)
					  	);
					}
				});
            }

            var sql = "SELECT * From warranty where id='"+req.body.id+"'";
			con.query(sql, function (err, warranty) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (warranty.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Warranty does not found !"
						)
					);
				} else {
					res.send(result.response(200, warranty, "Warranty Details"));
				}
			});
		});
	}
});


  /**
 * Get Home Warranty
 */
 router.post("/gethomewarranty", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT id, product_name, installation_date, installation_company_name, contact_number, comments, product_price, installation_charges, extended_warranty_end_date From warranty where house_id='"+req.body.house_id+"'";
			con.query(sql, function (err, warranty) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (warranty.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Warranty does not found !"
						)
					);
				} else {
					res.send(result.response(200, warranty, "Home warranty Details"));
				}
			});
		});
	}
});


/**
 * Delete single warranty
 */
 router.post("/deletesinglewarranty", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "select image from warranty where id = '"+req.body.id+"'";
			con.query(sql, function (err, warranty) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (warranty.length > 0) {
					let path = warranty[0]['image'].substr(11);
					path = "public\\files\\" + path;
					removeFile(path);
				}
			});

			sql = "delete from warranty where id='"+req.body.id+"'";
			con.query(sql, function (err, warranty) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (warranty.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"warranty does not found !"
						)
					);
				} else {
					var sql = "SELECT id, product_name, installation_date, installation_company_name, contact_number, comments, product_price, installation_charges, extended_warranty_end_date From warranty where house_id='"+req.body.house_id+"'";
					con.query(sql, function (err, warranty) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else if (warranty.length === 0) {
							res.send(
								result.response(
									404,
									{},
									"Warranty does not found !"
								)
							);
						} else {
							res.send(result.response(200, warranty, "Home warranty deleted successfully!"));
						}
					});
				}
			});
		});
	}
});

module.exports = router;