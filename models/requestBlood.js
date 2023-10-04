var mongoose = require("mongoose");

var bloodRequestSchema = new mongoose.Schema({
	type: {type: String,enum:['blood','platelets'],require:true},
	bloodgroup: {type: String,require:true},
    bloodunit: {type: Number,require:true},
    required_upto:{type:Date},
    contact:{type:Number},
    userId:{type:String},
    user_name:{type:String},
    hospital:{type:String},
    covidtest:{type:Boolean},
    replacement_available:{type:Boolean},
    patient_name:{type:String},
    patient_age:{type:Number},
    location:{type:String},
    weight :{type:Number}
  
    
}, {timestamps: true});


const BloodRequest=mongoose.model("BloodRequest", bloodRequestSchema)

module.exports = BloodRequest ;