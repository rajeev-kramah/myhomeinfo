var result = require("./response");
const router = require("express").Router();
const con = require("./config");

/**
 * Create event
*/
router.post("/", async (req, res) => {
    //id, title, eventDate, house_id
	let id = req.body.id;
	let eventDate = req.body.dateTime;
	let title = req.body.title;
	let house_id = req.body.house_id;

	con.connect(function(err) {
		var sql = "INSERT INTO reminder (start, title, house_id) VALUES ('"+eventDate+"', '"+title+"', '"+house_id+"')";

		if(id){
			sql = "UPDATE reminder SET eventDate = '"+eventDate+"', title = '"+title+"' where id = '"+id+"'";
		}
		
		con.query(sql, function (err, event) {
			if (err) {
				res.send(
					result.response(
						500,
						err,
						"OOPS, Something went wrong !, Please try again"
					)
				);
			} else {
				sql =  "SELECT * FROM reminder where house_id='"+house_id+"'"
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
 * Get single event
 */
 router.post("/getsingleevent", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT * From reminder where id='"+req.body.id+"'";
			con.query(sql, function (err, event) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (event.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"event does not found !"
						)
					);
				} else {
					res.send(result.response(200, event, "event Details"));
				}
			});
		});
	}
});


  /**
 * Get Home event
 */
 router.post("/getevent", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT  * From reminder where house_id='"+req.body.house_id+"'";
			con.query(sql, function (err, event) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (event.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"event does not found !"
						)
					);
				} else {
					res.send(result.response(200, event, "Home event Details"));
				}
			});
		});
	}
});


/**
 * Delete single event
 */
 router.post("/delete", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "delete From reminder where id='"+req.body.id+"'";
			con.query(sql, function (err, event) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (event.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"event does not found !"
						)
					);
				} else {
					var sql = "SELECT * From reminder where house_id='"+req.body.house_id+"'";
					con.query(sql, function (err, event) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else if (event.length === 0) {
							res.send(
								result.response(
									404,
									{},
									"event does not found !"
								)
							);
						} else {
							res.send(result.response(200, event, "Home event deleted successfully!"));
						}
					});
				}
			});
		});
	}
});

module.exports = router;