var mongoose = require("mongoose");

var plasmaRequestSchema = new mongoose.Schema({
    name: {type: String,require:true},
    dob:{type:Date},
	email: {type: String,require:true},
    bloodgroup:{type:String},
    location:{type:String},
    weight:{type:Number},
    covid_test:{type:Date},
    tattoed:{type:Boolean},
    hiv_test:{type:Boolean},
    covid_vaccine:{type:Boolean},
  
    
}, {timestamps: true});


const PlasmaRequest=mongoose.model("PlasmaRequest", plasmaRequestSchema)

module.exports = PlasmaRequest ;