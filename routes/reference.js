var result = require("./response");
const router = require("express").Router();
const con = require("./config");
var nodemailer = require('nodemailer');
var fs = require('fs');
var refer = fs.createReadStream('./routes/refer/index.html',{encoding:'utf-8'});
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
		if (error) {
			console.log("error: ", error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}


/**
 * Create and update reference
*/
router.post("/", async (req, res) => {

	let id = req.body.id; 
	let name = req.body.name;
	let phone = req.body.phone;
    let email = req.body.email;
    let owner_id = req.body.owner_id;

	let d1 = new Date();
	let day = d1.getDate();
	let month = monthNames[d1.getMonth()];
	let year = d1.getFullYear();
	let referred_date = day + " " + month + " " + year;

	con.connect(function(err) {
		var sql = "INSERT INTO reference (name, phone, email, owner_id, referred_date) VALUES ('"+name+"', '"+phone+"', '"+email+"', '"+owner_id+"', '"+referred_date+"')";

		if(id){
			sql = "UPDATE reference SET name = '"+name+"', email = '"+email+"', phone = '"+phone+"' where id = '"+id+"'";
		}
		
		con.query(sql, function (err, reference) {
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
					html: refer
				};
				// sendMail(mailOptions);

				var sql = "select id, referred_date, name, phone, email, registered_on from reference where owner_id = '" + owner_id + "'";

				con.query(sql, function (err, reference) {
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
                                reference,
                                "Reference successfull"
                            )
                        );
					}
				});
			}
		});
	});
});


/**
 * Get single Reference
 */
 router.post("/getsinglereference", async (req, res) => {
	if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
		con.connect(function(err) {
            var sql = "SELECT * From reference where id='"+req.body.id+"'";
			con.query(sql, function (err, reference) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (reference.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Reference does not found !"
						)
					);
				} else {
					res.send(result.response(200, reference, "Reference Details"));
				}
			});
		});
	}
});


  /**
 * Get Owner referneces
 */
 router.post("/getuserreferneces", async (req, res) => {
	if (!req.body.owner_id) {
		res.send(result.response(422, "", "User Id is empty"));
	} else {
		con.connect(function(err) {
			var sql = "SELECT id, referred_date, name, phone, email, registered_on From reference where owner_id='"+req.body.owner_id+"'";
			con.query(sql, function (err, reference) {
				if (err) {
					res.send(
						result.response(
							500,
							err,
							"OOPS, Something went wrong !, Please try again"
						)
					);
				} else if (reference.length === 0) {
					res.send(
						result.response(
							404,
							{},
							"Reference not found !"
						)
					);
				} else {
					res.send(result.response(200, reference, "User reference Details"));
				}
			});
		});
	}
});

module.exports = router;