var result = require("./response");
const router = require("express").Router();
const con = require("./config");
var fs = require('fs');
var registration = fs.createReadStream('./routes/registration/index.html',{encoding:'utf-8'});
var nodemailer = require('nodemailer');
const emailid = "myhomeinfo.ca@gmail.com"

function sendMail(mailOptions){
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: "smtp.example.com",
		port: 587,
		secure: false, // upgrade later with STARTTLS
		pool: true,
		auth: {
			user: "mksinghnitc@gmail.com",
			pass: "manoharkumarsingh@89"
		}
	});
	
	transporter.sendMail(mailOptions, function(er, info){
		console.log(info,er)
		if (error) {
			console.log("error: ", error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}


/**
 * Create share
 */
router.post("/", async (req, res) => {
//id, fname, lname, phono, email, accesslevel, house_id
  let id = req.body.id; 
  let fname = req.body.fname;   
  let lname = req.body.lname;  
  let phono = req.body.phono;  
  let email = req.body.email;  
  let accesslevel = req.body.accesslevel; 
  let house_id = req.body.house_id;
  let owner_id = req.body.owner_id;
 
    con.connect(function(err) {
        var sql = "INSERT INTO share (fname, lname, phono, email, accesslevel, house_id,owner_id) VALUES ('"+fname+"', '"+lname+"', '"+phono+"', '"+email+"', '"+accesslevel+"','"+house_id+"','"+owner_id+"')";
        if(id){
            sql = "UPDATE share SET fname = '"+fname+"', lname = '"+lname+"', phono = '"+phono+"', email = '"+email+"', accesslevel = '"+accesslevel+"', house_id = '"+house_id+"', owner_id='"+owner_id+"' where id = '"+id+"'";
        }
        con.query(sql, function (err, share) {
            if (err) {
                res.send(
                    result.response(
                    500,
                    err,
                    "OOPS, Something went wrong !, Please try again"
                    )
                );
            } else {
                sql =  "SELECT * FROM share where house_id='"+house_id+"'"
                con.query(sql, function (err, share) {
                    if (err) {
                        res.send(
                            result.response(
                            500,
                            err,
                            "OOPS, Something went wrong !, Please try again"
                            )
                        );
                    } else {
						var mailOptions = {
							from: emailid,
							to: email,
							subject: 'New Account Opening',
							html: registration
						};
						sendMail(mailOptions);
						res.send(
							result.response(
							200,
							share,
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
 * Get single share
 */
 router.post("/getsingleshare", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT * From share where id='"+req.body.id+"'";
			con.query(sql, function (err, share) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (share.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Contact does not found !"
						)
					);
				} else {
					res.send(result.response(200, share, "Contact Details"));
				}
			});
		});
	}
  });


  /**
 * Get Home share
 */
 router.post("/gethomeshare", async (req, res) => {
	if (!req.body.house_id) {
		res.send(result.response(422, "", "house_id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT * From share where house_id='"+req.body.house_id+"' AND owner_id = 0 AND email !='"+req.body.email+"'";
			con.query(sql, function (err, share) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (share.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"share does not found !"
						)
					);
				} else {
					res.send(result.response(200, share, "Home share Details"));
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
			var sql = "Delete from share where id = '"+req.body.id+"'";
			con.query(sql, function (err, share) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (share.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"share does not found !"
						)
					);
				} else {
					var sql = "SELECT * From share where house_id='"+req.body.house_id+"'";
					con.query(sql, function (err, share) {
						if (err) {
							res.send(
								result.response(
									500,
									err,
									"OOPS, Something went wrong !, Please try again"
								)
							);
						} else {
							res.send(result.response(200, share, "Shared deleted successfully!"));
						}
					});
				}
			});
		});
	}
});


module.exports = router;
