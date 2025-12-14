const express = require("express"); 
const path = require("path");
const app = express(); 
const portNumber = 3000;

//const browse = require("./routes/browse");
//const fact = require("./routes/fact");

/* Defining the view/templating engine to use */
app.set("view engine", "ejs");

/* Directory where templates will reside */
app.set("views", path.resolve(__dirname, "templates"));

app.use(express.static(__dirname));

/* Treating building.js like middleware. Use buildings.js 
   file to handle endpoints that start with /buildings */
//app.use("/browse", browse);

/* Treating schoolDorms.js like middleware. Use schoolDorms.js 
   file to handle endpoints that start with /dorms.  Examples shows you
   don't have to name file after part of the endpoint */
//app.use("/fact", fact);

/* This one cannot be first */
app.use("/", (request, response) => {
   response.render("homePage")
 });

console.log(`Server listening on port ${portNumber}`)
const homeURL = `http://localhost:${portNumber}`;
console.log(homeURL);

app.listen(portNumber);