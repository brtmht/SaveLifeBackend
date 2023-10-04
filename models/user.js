var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	name: {type: String,require:true},
	email: {type: String,require:true},
    password: {type: String,require:true},
    image:{ type :String},
    gender:{type:String,enum:['male','female','other']},
    contact:{type:Number},
    facebookId:{type:String},
    dob:{type:Date},
    bloodgroup:{type:String},
    googleId:{type:String},
    weight:{type:Number},
    tested_positive:{type:Date},
    tested_negative:{type:Date},
    covid_symptoms:{type:Boolean},
    covid_vaccine:{type:Boolean},
    location:{type:String}
    
},
 {timestamps: true}
);


const User=mongoose.model("User", UserSchema)

module.exports = User ;