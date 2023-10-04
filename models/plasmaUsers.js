var mongoose = require("mongoose");

var PlasmaUserSchema = new mongoose.Schema({
	name: {type: String,require:true},
    dob:{type:Date},
	email: {type: String,require:true},
    bloodgroup:{type:String},
    location:{type:String},
    weight:{type:Number},
    covid_test:{type:Date},
    covid_symptoms:{type:Boolean},
    covid_vaccine:{type:Boolean},
},
 {timestamps: true}
);


const plasmaUser=mongoose.model("plasmaUser", PlasmaUserSchema)

module.exports = plasmaUser ;