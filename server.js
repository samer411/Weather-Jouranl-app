// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// cors package
const cors = require("cors");
// body-parser package
const bodyParser = require("body-parser");

// Start up an instance of app
const port = 2002;
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => {
  console.log(`Server is done ${port}`);
});

// The Post Request
app.post("/addData", (request, response) => {
  projectData = request.body;
  response.send({ message: "Successfull" });
});
// The Get Request
app.get("/getData", (request, response) => {
  response.send(projectData);
});
