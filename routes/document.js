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
 * Create Document
*/
router.post("/", upload.single("attachment"), async (req, res) => {

	let id = req.body.id;
	let attachment = req.body.attachment;
	let date = req.body.date;
	let category = req.body.category;
	let docname = req.body.docname;
	let description = req.body.description;
	let house_id = req.body.house_id;

	con.connect(function(err) {
        // if (req.file) {
        //     attachment = req.file.path;
        // }

		var sql = "INSERT INTO document (date, category, docname, description, attachment, house_id) VALUES ('"+date+"', '"+category+"', '"+docname+"', '"+description+"', '"+attachment+"', '"+house_id+"')";

		if(id){
			sql = "UPDATE document SET date = '"+date+"', category = '"+category+"', docname = '"+docname+"', description = '"+description+"' ";

			if(attachment) {
				sql += ", attachment = '"+attachment+"'";
			}

			sql += " where id = '"+id+"'";
		}
		
		con.query(sql, function (err, document) {
			if (err) {
				res.send(
					result.response(
						500,
						err,
						"OOPS, Something went wrong !, Please try again"
					)
				);
			} else {
				sql =  "SELECT * FROM document where house_id='"+house_id+"'"
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


/**
 * Get single document
 */
 router.post("/getsingledocument", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			if(req.body.delete === "doc") {
				var sql = "select attachment from document where id = '"+req.body.id+"'";
				con.query(sql, function (err, document) {
					if (err) {
						res.send(
							result.response(
								500,
								err,
								"OOPS, Something went wrong !, Please try again"
							)
						);
					} else if (document.length > 0) {
						let path = document[0]['attachment'].substr(11);
						path = "public\\files\\" + path;
						removeFile(path);
					}
				});

                sql = "Update document set attachment = '' where id = '"+req.body.id+"'";
				con.query(sql, function (err, document) {
					if(err) {
						res.send(
							result.response(
						  		500,
						  		err,
						  		"OOPS, Something went wrong !, Please try again"
							)
					  	);
					} else if (document.length === 0) {
					  	res.send(
							result.response(
						  		404,
						  		{},
						  		"Document does not found !"
							)
					  	);
					}
				});
            }

			var sql = "SELECT * From document where id='"+req.body.id+"'";
			con.query(sql, function (err, document) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (document.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Document does not found !"
						)
					);
				} else {
					res.send(result.response(200, document, "Document Details"));
				}
			});
		});
	}
});


  /**
 * Get Home document
 */
 router.post("/gethomedocument", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT * From document where house_id='"+req.body.house_id+"'";
			con.query(sql, function (err, document) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (document.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Document does not found !"
						)
					);
				} else {
					res.send(result.response(200, document, "Home Document Details"));
				}
			});
		});
	}
});


/**
 * Delete single document
 */
 router.post("/deletesingledocument", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "select attachment from document where id = '"+req.body.id+"'";
			con.query(sql, function (err, document) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (document.length > 0) {
					let path = document[0]['attachment'].substr(11);
					path = "public\\files\\" + path;
					removeFile(path);
				}
			});

			var sql = "delete From document where id='"+req.body.id+"'";
			con.query(sql, function (err, document) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (document.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Document does not found !"
						)
					);
				} else {
					var sql = "SELECT id, docname, date, description From document where house_id='"+req.body.house_id+"'";
					con.query(sql, function (err, document) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else if (document.length === 0) {
							res.send(
								result.response(
									404,
									{},
									"Document does not found !"
								)
							);
						} else {
							res.send(result.response(200, document, "Home document deleted successfully!"));
						}
					});
				}
			});
		});
	}
});

module.exports = router;