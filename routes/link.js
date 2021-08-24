var result = require("./response");
const router = require("express").Router();
const con = require("./config");

/**
 * Create link
*/
router.post("/", async (req, res) => {

	let id = req.body.id;
	let date = req.body.date;
	let groupname = req.body.groupname;
	let urlname = req.body.urlname;
	let description = req.body.description;
	let house_id = req.body.house_id;

	con.connect(function(err) {
		var sql = "INSERT INTO link (date, groupname, urlname, description, house_id) VALUES ('"+date+"', '"+groupname+"', '"+urlname+"', '"+description+"', '"+house_id+"')";

		if(id){
			sql = "UPDATE link SET date = '"+date+"', groupname = '"+groupname+"', urlname = '"+urlname+"', description = '"+description+"' where id = '"+id+"'";
		}
		
		con.query(sql, function (err, link) {
			if (err) {
				res.send(
					result.response(
						500,
						err,
						"OOPS, Something went wrong !, Please try again"
					)
				);
			} else {
				sql =  "SELECT * FROM link where house_id='"+house_id+"'"
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
 * Get single link
 */
 router.post("/getsinglelink", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT * From link where id='"+req.body.id+"'";
			con.query(sql, function (err, link) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (link.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Link does not found !"
						)
					);
				} else {
					res.send(result.response(200, link, "Link Details"));
				}
			});
		});
	}
});


  /**
 * Get Home link
 */
 router.post("/gethomelink", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT id, urlname, date, description, groupname From link where house_id='"+req.body.house_id+"'";
			con.query(sql, function (err, link) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (link.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Link does not found !"
						)
					);
				} else {
					res.send(result.response(200, link, "Home Link Details"));
				}
			});
		});
	}
});


/**
 * Delete single link
 */
 router.post("/deletesinglelink", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "delete From link where id='"+req.body.id+"'";
			con.query(sql, function (err, link) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (link.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Link does not found !"
						)
					);
				} else {
					var sql = "SELECT id, urlname, date, description, groupname From link where house_id='"+req.body.house_id+"'";
					con.query(sql, function (err, link) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else if (link.length === 0) {
							res.send(
								result.response(
									404,
									{},
									"Link does not found !"
								)
							);
						} else {
							res.send(result.response(200, link, "Home link deleted successfully!"));
						}
					});
				}
			});
		});
	}
});

module.exports = router;