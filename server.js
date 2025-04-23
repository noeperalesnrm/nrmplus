const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

var https = require('https');
var http = require('http');
var fs = require('fs');

const app = express();

var options = {
  key: fs.readFileSync('/home/development_nrm/projects/nrmplus/selfsigned.key', 'utf8'),
  cert: fs.readFileSync('/home/development_nrm/projects/nrmplus/selfsigned.crt', 'utf8')
};

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");
db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to nomad API." });
});

require("./app/routes/turorial.routes")(app);
require("./app/routes/device.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/form.routes")(app);
require("./app/routes/question.routes")(app);
require("./app/routes/answer.routes")(app);
require("./app/routes/user_answer.routes")(app);

// set port, listen for requests
/*const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
*/

//http.createServer(app).listen(80);
https.createServer(options, app).listen(443);