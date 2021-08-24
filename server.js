const express = require("express");
require("express-async-errors");
const app = express();
var bodyParser = require('body-parser')
const morgan = require("morgan");
var cors = require("cors");
app.use(cors());

require("./dbSetUp");
app.use(morgan());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use("/insurance", require("./routes/insurance"));
app.use("/users", require("./routes/users"));
app.use("/home", require("./routes/home"));
app.use("/loan", require("./routes/loan"));
app.use("/contact", require("./routes/contacts"));
app.use("/transaction", require("./routes/transaction"));
app.use("/warranty", require("./routes/warranty"));
app.use("/reference", require("./routes/reference"));
app.use("/document", require("./routes/document"));
app.use("/link", require("./routes/link"));
app.use("/gallery", require("./routes/gallery"));
app.use("/lease", require("./routes/lease"));
app.use("/share", require("./routes/share"));
app.use("/event", require("./routes/event"));


/*Not Found Route*/
app.use((req, res, next) => {
  req.status = 404;
  const error = new Error("Routes not found");
  next(error);
});

//Error handler
if (app.get("env") === "blogion") {
  app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
      message: error.message
    });
  });
}

app.use((error, req, res, next) => {
  res.status(req.status || 500).send({
    message: error.message
    //    stack : error.stack
  });
});

const port = process.env.PORT || 4600;
app.listen(port, (req, res) => {
  console.log(`RUNNING on port ${port}`);
});
