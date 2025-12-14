const express = require("express"); 
const path = require("path");
const app = express(); 
const bodyParser = require("body-parser");
const portNumber = 3000;

const browse = require("./routes/browse");
const fact = require("./routes/fact");

/* Defining the view/templating engine to use */
app.set("view engine", "ejs");

/* Directory where templates will reside */
app.set("views", path.resolve(__dirname, "templates"));

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname));

app.use("/browse", browse);

app.use("/fact", fact);

/* This one cannot be first */
app.use("/", (request, response) => {
   response.render("homePage")
 });

console.log(`Server listening on port ${portNumber}`)
const homeURL = `http://localhost:${portNumber}`;
console.log(homeURL);

app.listen(portNumber);
