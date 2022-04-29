require("dotenv").config();
require("./db/connection")
const express = require("express")
const app = express();
const homeRoute = require("./routes/home-routes");
const bodyParser = require("body-parser")
const PORT = process.env.PORT ;

//set up static file
app.use(express.static("./static"))

//set up bodyparser
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))

//set view engine
app.set("view engine", "ejs")

//set up routes
app.use(homeRoute)

app.listen(PORT, ()=>console.log("Server started"))