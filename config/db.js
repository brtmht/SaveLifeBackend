require("dotenv").config();
var mongoose = require("mongoose");
var MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
		console.log("Connected to %s", MONGODB_URL);
})
	.catch(err => {
		console.error("MongoDB connection error:", err.message);
		process.exit(1);
    });
     mongoose.connection;

    