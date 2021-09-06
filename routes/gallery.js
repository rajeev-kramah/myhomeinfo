var result = require("./response");
const router = require("express").Router();
const multer = require("multer");
const con = require("./config");
const fs = require("fs");

const removeFile = (path) => {
	fs.unlink(path, (err) => {
		if (err) {
			console.log(err);
			return false;
		} else {
			return true;
		}
	});
}

/** Storage Engine */
const storage = multer.diskStorage({
	destination: function (req, file, fn) {
		fn(null, "./public/files");
	},
	filename: function (req, file, fn) {
		fn(null, new Date().getTime().toString() + "-" + file.originalname);
	}
});

const fileFilter = function (req, file, callback) {
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
 * Create Gallery
*/
router.post("/", upload.single("attachment"), async (req, res) => {
	console.log("request", req.body.house_id, req.body.groupType)
	let id = req.body.id;
	let attachment = "";
	let house_id = req.body.house_id;
	// let album_name = req.body.groupType;
	let album_name = req.body.album_name;

	con.connect(function (err) {
		if (req.file) {
			attachment = req.file.path;
			attachment = '../files/' + attachment.substr(12);
		}

		var sql = "INSERT INTO gallery (attachment, house_id, album_name) VALUES ('" + attachment + "', '" + house_id + "', '" + album_name + "')";

		con.query(sql, function (err, gallery) {
			if (err) {
				res.send(
					result.response(
						500,
						err,
						"OOPS, Something went wrong !, Please try again"
					)
				);
			} else {
				var sql = "SELECT * FROM gallery WHERE house_id = '" + house_id + "'and album_name='" + album_name + "'";

				con.query(sql, function (err, gallery) {
					if (err) {
						res.send(
							result.response(
								500,
								err,
								"OOPS, Something went wrong !, Please try again"
							)
						);
					} else {
						console.log("request_1", res, req.body.house_id, req.body.groupType)
						res.send(
							result.response(
								200,
								gallery,
								"Gallery added Successfiully!"
							)
						);
					}
				});
			}
		});
	});
});


/**
* Get Home gallery
*/
router.post("/gethomegallery", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	} else {
		con.connect(function (err) {
			//SELECT DISTINCT Country FROM Customers;
			//album_name
			var sql = "SELECT * From gallery where house_id='" + req.body.house_id + "' and album_name='" + req.body.album_name + "'";
			//var sql = "SELECT DISTINCT album_name From gallery where house_id='"+req.body.house_id+"'";
			console.log('sql', sql);
			con.query(sql, function (err, gallery) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (gallery.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Gallery does not found !"
						)
					);
				} else {
					res.send(result.response(200, gallery, "Home Gallery Details"));
				}
			});
		});
	}
});


/**
 * Delete single gallery
 */
router.post("/deletesinglegallery", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function (err) {
			var sql = "select attachment from gallery where id = '" + req.body.id + "'";
			con.query(sql, function (err, gallery) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (gallery.length > 0) {
					let path = gallery[0]['attachment'].substr(11);
					path = "public\\files\\" + path;
					removeFile(path);
				}
			});

			var sql = "delete From gallery where id='" + req.body.id + "'";
			con.query(sql, function (err, gallery) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else {
					var sql = "SELECT * From gallery where house_id='" + req.body.house_id + "'and album_name='" + req.body.album_name + "'";
					con.query(sql, function (err, gallery) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else {
							res.send(result.response(200, gallery, "Home gallery deleted successfully!"));
						}
					});
				}
			});
		});
	}
});

module.exports = router;