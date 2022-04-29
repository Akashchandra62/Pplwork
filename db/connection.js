const mongoose = require("mongoose")

mongoose.connect(process.env.dbURL)
.then((result) => {
    console.log("Connected to database");
    
}).catch((err) => {
    console.log("Error in connecting to database");
});