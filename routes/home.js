var result = require("./response");
const router = require("express").Router();
var nodemailer = require('nodemailer');
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
 * Create House
 */
router.post("/",upload.single("houseImage"), async (req, res) => {
  //id, houseno, streetname, city, state, country, zip, primaryHouse, yearbuilt, surveyno, purchaseamount, purchasedate, buildername, subdivision, owner_id
  let houseno = req.body.houseno;
  let streetname = req.body.streetname;
  let city = req.body.city;
  let state = req.body.state;
  let country = req.body.country;
  let zip = req.body.zip;
  let primaryHouse = req.body.primaryHouse;
  let yearbuilt = req.body.yearbuilt;
  let surveyno = req.body.surveyno;
  let purchaseamount = req.body.purchaseamount;
  let purchasedate = req.body.purchasedate;
  let buildername = req.body.buildername;
  let subdivision = req.body.subdivision;
  let owner_id = req.body.owner_id;
  let id = req.body.id;
  let currency = req.body.currency;
  let ownerEmail = req.body.ownerEmail;
  let img_path = req.body.img_path

  con.connect(function(err) {
        // if (req.file) {
        //     img_path = req.file.path;
        //   }
        var sql = "INSERT INTO house (houseno, streetname, city, state, country, zip, primaryHouse, yearbuilt, surveyno, purchaseamount, purchasedate, buildername, subdivision, img_path, currency) VALUES ('"+houseno+"', '"+streetname+"', '"+city+"', '"+state+"', '"+country+"', '"+zip+"', '"+primaryHouse+"', '"+yearbuilt+"', '"+surveyno+"', '"+purchaseamount+"', '"+purchasedate+"', '"+buildername+"', '"+subdivision+"', '"+img_path+"', '"+currency+"')";

        if(id){
            updateStatus = true;
            if(img_path){
                sql = "UPDATE house SET houseno = '"+houseno+"', streetname =  '"+streetname+"', city = '"+city+"', state ='"+state+"', country = '"+country+"', zip = '"+zip+"', primaryHouse = '"+primaryHouse+"',  yearbuilt = '"+yearbuilt+"',  surveyno ='"+surveyno+"', purchaseamount = '"+purchaseamount+"', purchasedate =  '"+purchasedate+"', buildername = '"+buildername+"', subdivision ='"+subdivision+"', img_path='"+img_path+"', currency='"+currency+"' where id = '"+id+"'";
            }else{
                sql = "UPDATE house SET houseno = '"+houseno+"', streetname =  '"+streetname+"', city = '"+city+"', state ='"+state+"', country = '"+country+"', zip = '"+zip+"', primaryHouse = '"+primaryHouse+"',  yearbuilt = '"+yearbuilt+"',  surveyno ='"+surveyno+"', purchaseamount = '"+purchaseamount+"', purchasedate =  '"+purchasedate+"', buildername = '"+buildername+"', subdivision ='"+subdivision+"', currency='"+currency+"' where id = '"+id+"'";
            }
           
        }
        con.query(sql, function (err, user) {
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
                    var sql = "SELECT distinct house.id, houseno, streetname, city, state, country, zip, primaryHouse, yearbuilt, surveyno, purchaseamount, purchasedate, buildername, subdivision, img_path, currency, share.accesslevel, share.email as email from house INNER JOIN share on house.id = share.house_id where share.email='"+ownerEmail+"'  AND house.id='"+id+"'";
					//sql = "select * from house where id = '" + id + "'";
				} else {
                    sql =  "SELECT * FROM house WHERE ID = (SELECT MAX(ID) FROM house)"
                }
                con.query(sql, function (err, user) {
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
                            res.send(
                                result.response(
                                200,
                                user,
                                "Updated successfully!"
                                )
                            );
                        }else{
                           
                        var sql = "INSERT INTO share (fname, lname, phono, email, accesslevel, house_id, owner_id) VALUES ('', '', '', '"+ownerEmail+"', 'Full-Access','"+user[0].id+"','"+owner_id+"')";
                        con.query(sql, function (err, user) {
                            if (err) {
                                res.send(
                                    result.response(
                                    500,
                                    err,
                                    "OOPS, Something went wrong !, Please try again"
                                    )
                                );
                            } else {
                                var sql = "SELECT distinct house.id, houseno, streetname, city, state, country, zip, primaryHouse, yearbuilt, surveyno, purchaseamount, purchasedate, buildername, subdivision, img_path, currency, share.accesslevel, share.email as email from house INNER JOIN share on house.id = share.house_id where share.email='"+ownerEmail+"'  AND house.id= (SELECT MAX(ID) FROM house)";
                                con.query(sql, function (err, house) {
                                    if (err) {
                                        res.send(
                                            result.response(
                                            500,
                                            err,
                                            "OOPS, Something went wrong !, Please try again"
                                            )
                                        );
                                    } else{
                                        res.send(
                                            result.response(
                                            200,
                                            house,
                                            "Congratulation ! You have succefully created house !"
                                            )
                                        );
                                    }
                                })
                                
                            }
                        });
                        
                           
                        }
                    }
                });
            }
        });
    });
});


/**
 * Create Title Holder
 */
 router.post("/titleholders", async (req, res) => {
    //id, titleholder1, titleholder2, titleholder3, titleholder4, house_id
    let titleholder1 = req.body.titleholder1;
    let titleholder2 = req.body.titleholder2;
    let titleholder3 = req.body.titleholder3;
    let titleholder4 = req.body.titleholder4;
    let house_id = req.body.house_id;
    let id =  req.body.id;
    con.connect(function(err) {
      var sql = "INSERT INTO titleholders (titleholder1, titleholder2, titleholder3, titleholder4, house_id) VALUES ('"+titleholder1+"', '"+titleholder2+"', '"+titleholder3+"','"+titleholder4+"', '"+house_id+"')";
      
      if(id){
        sql = "UPDATE titleholders SET titleholder1 = '"+titleholder1+"', titleholder2 =  '"+titleholder2+"', titleholder3 = '"+titleholder3+"', titleholder4 ='"+titleholder4+"', house_id = '"+house_id+"' where id = '"+id+"'";
      }
      con.query(sql, function (err, user) {
          if (err) {
              res.send(
                  result.response(
                  500,
                  err,
                  "OOPS, Something went wrong !, Please try again"
                  )
              );
          } else {
              var sql =  "SELECT * FROM titleholders WHERE ID = (SELECT MAX(ID) FROM titleholders)"
              con.query(sql, function (err, user) {
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
                        res.send(
                            result.response(
                            200,
                            user,
                            "Updated successfully!"
                            )
                        );
                    }else{
                      res.send(
                          result.response(
                          200,
                          user,
                          "Title holders created !"
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
 * HOA Details
 */
 router.post("/hoadetails", async (req, res) => {
    // id, companyname, contactname, phoneno, email, frequency, amount, house_id, companyname1, contactname1, phoneno1, email1, frequency1, amount1, reminder_date, reminder_phone, reminder_email
    let companyname = req.body.companyname;
    let companyname1 = req.body.companyname1;
    let contactname = req.body.contactname;
    let contactname1 = req.body.contactname1;
    let phoneno = req.body.phoneno;
    let phoneno1 = req.body.phoneno1;
    let email = req.body.email;
    let email1 = req.body.email1;
    let frequency = req.body.frequency;
    let frequency1 = req.body.frequency1;
    let amount = req.body.amount;
    let amount1 = req.body.amount1;
    let house_id = req.body.house_id;
    let reminder_date=req.body.reminder_date;
    let reminder_phone=req.body.reminder_phone;
    let reminder_email=req.body.reminder_email;
    let reminder_message=req.body.reminder_message;
    let id =  req.body.id;
    con.connect(function(err) {
    var sql = "INSERT INTO hoadetails (companyname, contactname, phoneno, email, frequency, amount, companyname1, contactname1, phoneno1, email1, frequency1, amount1, reminder_date, reminder_phone, reminder_email, reminder_message, house_id) VALUES ('"+companyname+"', '"+contactname+"', '"+phoneno+"', '"+email+"', '"+frequency+"', '"+amount+"','"+companyname1+"','"+contactname1+"','"+phoneno1+"', '"+email1+"', '"+frequency1+"', '"+amount1+"', '"+reminder_date+"', '"+reminder_phone+"', '"+reminder_email+"', '"+reminder_message+"', '"+house_id+"')";

      if(id){
        sql = "UPDATE hoadetails SET companyname = '"+companyname+"', contactname =  '"+contactname+"', phoneno = '"+phoneno+"', email ='"+email+"',frequency ='"+frequency+"',amount ='"+amount+"',companyname1 = '"+companyname1+"', contactname1 =  '"+contactname1+"', phoneno1 = '"+phoneno1+"', email1 ='"+email1+"',frequency1 ='"+frequency1+"',amount1 ='"+amount1+"',reminder_date='"+reminder_date+"', reminder_phone='"+reminder_phone+"', reminder_email='"+reminder_email+"', reminder_message='"+reminder_message+"', house_id = '"+house_id+"' where id = '"+id+"'";
      }

      con.query(sql, function (err, user) {
          if (err) {
              res.send(
                  result.response(
                  500,
                  err,
                  "OOPS, Something went wrong !, Please try again"
                  )
              );
          } else {
              var sql =  "SELECT * FROM hoadetails WHERE ID = (SELECT MAX(ID) FROM hoadetails)"
              con.query(sql, function (err, user) {
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
                        res.send(
                            result.response(
                            200,
                            user,
                            "Updated successfully!"
                            )
                        );
                    }else{
                      res.send(
                          result.response(
                          200,
                          user,
                          "HOA details created !"
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
 * Realtor Details
 */
 router.post("/realtor",upload.single("realtorImage"), async (req, res) => {
    //id, name, phono, email, details, house_id
    let name = req.body.name;
    let phono = req.body.phono;
    let email = req.body.email;
    let details = req.body.details;
    let house_id = req.body.house_id;
    let id =  req.body.id;
    let img_path = req.body.img_path
    con.connect(function(err) {
        // var img_path = "";
        // if (req.file) {
        //     img_path = req.file.path;
        // }

        var sql = "INSERT INTO realtor (name, phono, email, details, house_id, img_path) VALUES ('"+name+"', '"+phono+"', '"+email+"', '"+details+"', '"+house_id+"','"+img_path+"')";
        if(id){
            if(img_path){
                sql= "UPDATE realtor SET name = '"+name+"', phono =  '"+phono+"', email = '"+email+"', details ='"+details+"', house_id = '"+house_id+"', img_path='"+img_path+"' where id = '"+id+"'";
            }else{
                sql= "UPDATE realtor SET name = '"+name+"', phono =  '"+phono+"', email = '"+email+"', details ='"+details+"', house_id = '"+house_id+"' where id = '"+id+"'";
            }
           
        }



      
      if(id){
       
      }

      con.query(sql, function (err, user) {
          if (err) {
              res.send(
                  result.response(
                  500,
                  err,
                  "OOPS, Something went wrong !, Please try again"
                  )
              );
          } else {
              var sql =  "SELECT * FROM realtor WHERE ID = (SELECT MAX(ID) FROM realtor)"
              con.query(sql, function (err, user) {
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
                        res.send(
                            result.response(
                            200,
                            user,
                            "Updated successfully!"
                            )
                        );
                    }else{
                      res.send(
                          result.response(
                          200,
                          user,
                          "Realtor details created !"
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
 * HMO Details
 */
 router.post("/hmodetails", async (req, res) => {
    //id, name, description, house_id
    let name = req.body.name;
    let description = req.body.description;
    let house_id = req.body.house_id;
    let id =  req.body.id;
    con.connect(function(err) {
      var sql = "INSERT INTO hmodetails (name, description,house_id) VALUES ('"+name+"', '"+description+"','"+house_id+"')";
      if(id){
        sql = "UPDATE hmodetails SET name = '"+name+"', description =  '"+description+"', house_id = '"+house_id+"' where id = '"+id+"'";
      }
      con.query(sql, function (err, user) {
          if (err) {
              res.send(
                  result.response(
                  500,
                  err,
                  "OOPS, Something went wrong !, Please try again"
                  )
              );
          } else {
              var sql =  "SELECT * FROM hmodetails WHERE ID = (SELECT MAX(ID) FROM hmodetails)"
              con.query(sql, function (err, user) {
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
                        res.send(
                            result.response(
                            200,
                            user,
                            "Updated successfully!"
                            )
                        );
                    }else{
                      res.send(
                          result.response(
                          200,
                          user,
                          "Hmo space details created !"
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
 * Read one house details
 */
 router.post("/housedetail", async (req, res) => {
    con.connect(function(err) {
        var id = req.body.id;
        var sql1 =  "SELECT distinct house.id, houseno, streetname, city, state, country, zip, primaryHouse, yearbuilt, surveyno, purchaseamount, purchasedate, buildername, subdivision, img_path, currency, share.accesslevel from house INNER JOIN share on house.id = share.house_id where share.email='"+req.body.email+"' AND house_id='"+id+"'";
        var sql2 = "SELECT * From hmodetails where house_id='"+id+"'";
        var sql3 = "SELECT * From hoadetails where house_id='"+id+"'";
        var sql4 = "SELECT * From realtor where house_id='"+id+"'";
        var sql5 = "SELECT * From titleholders where house_id='"+id+"'";
        let multiquery = [sql1,sql2,sql3,sql4,sql5];
        let finalResult = {};
        for(let i=0; i<5; i++){
            con.query(multiquery[i], function (err, data) {
                if (err) {
                    res.send(
                        result.response(
                            500,
                            err,
                            "OOPS, Something went wrong !, Please try again"
                        )
                    );
                }else {
                    if(i== 0){
                        finalResult.house = data;
                    }else if(i== 1){
                        finalResult.hmodetails = data;
                    }else if(i==2){
                        finalResult.hoadetails = data;
                    }else if(i==3){
                        finalResult.realtor = data;
                    }else if(i==4){
                        finalResult.titleholders = data;
                        res.send(result.response(200, finalResult,"House Details"));
                    }
                }
            });
            
        }
    });
  });



router.post("/ownerhouselist", async (req, res) => {
    con.connect(function(err) {
        var sql = "SELECT distinct house.id, houseno, streetname, city, state, country, zip, primaryHouse, yearbuilt, surveyno, purchaseamount, purchasedate, buildername, subdivision, img_path, currency, share.accesslevel from house INNER JOIN share on house.id = share.house_id where share.email='"+req.body.owner_id+"'";
        con.query(sql, function (err, data) {
            if (err) {
                res.send(
                    result.response(
                        500,
                        err,
                        "OOPS, Something went wrong !, Please try again"
                    )
                );
            }else {
                let finalResult = [];
                for(let i=0; i<data.length; i++){
                    let homeWiseDetails = {};
                    homeWiseDetails.house = data[i];
                    con.connect(function(err) {
                        var sql1 = "SELECT * From hmodetails where house_id='"+data[i]['id']+"'";
                        var sql2 = "SELECT * From hoadetails where house_id='"+data[i]['id']+"'";
                        var sql3 = "SELECT * From realtor where house_id='"+data[i]['id']+"'";
                        var sql4 = "SELECT * From titleholders where house_id='"+data[i]['id']+"'";
                        var sql5 = "SELECT * From loan where house_id='"+data[i]['id']+"' AND loantype ='Mortgage'";
                        var sql6 = "SELECT * From insurances where house_id='"+data[i]['id']+"'";
                        let multiquery = [sql1,sql2,sql3,sql4, sql5, sql6];
                        for(let j=0; j<6; j++){
                            con.query(multiquery[j], function (err, data1) {
                                if (err) {
                                    res.send(
                                        result.response(
                                            500,
                                            err,
                                            "OOPS, Something went wrong !, Please try again"
                                        )
                                    );
                                }
                                else {
                                    if(j== 0){
                                        homeWiseDetails.hmodetails = data1;
                                    }else if(j==1){
                                        homeWiseDetails.hoadetails = data1;
                                    }else if(j==2){
                                        homeWiseDetails.realtor = data1;
                                    }else if(j==3){
                                        homeWiseDetails.titleholders = data1;
                                    }else if(j==4){
                                        homeWiseDetails.loan = data1;
                                    }else if(j==5){
                                        homeWiseDetails.insurance = data1;
                                        finalResult.push(homeWiseDetails);
                                        if(i== data.length-1){
                                            res.send(result.response(200,finalResult ,"House Details"));
                                        } 
                                    }
                                }
                            });
                        }
                    })
                }
            }
        });
    });
});


router.post("/deletehouse", async (req, res) => {
    if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
        con.connect(function(err) {
            var sql = "delete from house where id = '"+req.body.id+ "'";
            con.query(sql, function (err, data) {
                if (err) {
                    res.send(
                        result.response(
                            500,
                            err,
                            "OOPS, Something went wrong !, Please try again"
                        )
                    );
                } else {
                    res.send(result.response(200, {}, "House details deleted successfully!"));
                }
            });
        });
    }
});


router.post("/deletehmo", async (req, res) => {
    if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
        con.connect(function(err) {
            var sql = "select * from hmodetails where id = '"+req.body.id+ "'";
            con.query(sql, function (err, data) {
                if (err) {
                    res.send(
                        result.response(
                            500,
                            err,
                            "OOPS, Something went wrong !, Please try again"
                        )
                    );
                } else {
                    sql = "Delete from hmodetails where id = '"+req.body.id+"'";
                    con.query(sql, function(err, hmo) {
                        if(err) {
                            res.send(
                                result.response(
                                    500,
                                    err,
                                    "Oops! Something went wrong. Please try later."
                                )
                            );
                        } else {
                            res.send(result.response(200, data, "HMO deleted successfully!"));
                        }
                    });
                }
            });
        });
    }
});


router.post("/deletehouseattachment", async (req, res) => {
    if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
        con.connect(function(err) {
            var sql = "select img_path from house where id = '"+req.body.id+ "'";
            con.query(sql, function (err, data) {
                if (err) {
                    res.send(
                        result.response(
                            500,
                            err,
                            "OOPS, Something went wrong !, Please try again"
                        )
                    );
                } else {
                    let path = data[0]['img_path'];
                    // path = "public\\files\\" + path;
                    let att = removeFile(path);

                    if(att === false){
                        res.send(
                            result.response(
                                500,
                                {},
                                "Oops! Something went wrong. Please try later."
                            )
                        );
                    } else {
                        sql = "update house set img_path = '' where id = '"+req.body.id+"'";
                        con.query(sql, function(err, house) {
                            if(err) {
                                res.send(
                                    result.response(
                                        500,
                                        err,
                                        "Oops! Something went wrong. Please try later."
                                    )
                                );
                            } else {
                                res.send(result.response(200, data, "House attachment deleted successfully!"));
                            }
                        });
                    }
                }
            });
        });
    }
});


router.post("/deleterealtorimg", async (req, res) => {
    if (!req.body.id) {
		res.send(result.response(422, "", "Id is empty"));
	} else {
        con.connect(function(err) {
            var sql = "select img_path from realtor where id = '"+req.body.id+ "'";
            con.query(sql, function (err, data) {
                if (err) {
                    res.send(
                        result.response(
                            500,
                            err,
                            "OOPS, Something went wrong !, Please try again"
                        )
                    );
                } else {
                    let path = data[0]['img_path'].substr(11);
                    path = "public\\files\\" + path;
                    let att = removeFile(path);

                    if(att === false){
                        res.send(
                            result.response(
                                500,
                                {},
                                "Oops! Something went wrong. Please try later."
                            )
                        );
                    } else {
                        sql = "update realtor set img_path = '' where id = '"+req.body.id+"'";
                        con.query(sql, function(err, house) {
                            if(err) {
                                res.send(
                                    result.response(
                                        500,
                                        err,
                                        "Oops! Something went wrong. Please try later."
                                    )
                                );
                            } else {
                                res.send(result.response(200, data, "Realtor attachment deleted successfully!"));
                            }
                        });
                    }
                }
            });
        });
    }
});

/**
 * Get house HMO details
 */
 router.post("/gethousehmo", async (req, res) => {
    con.connect(function(err) {
        var house_id = req.body.house_id;
        var sql =  "SELECT * from hmodetails where house_id='"+house_id+"'";
        con.query(sql, function (err, hmo) {
            if (err) {
                res.send(
                    result.response(
                        500,
                        err,
                        "OOPS, Something went wrong !, Please try again"
                    )
                );
            } else {
                res.send(result.response(200, hmo,"House Details"));
            }
        });
    });
});


module.exports = router;
