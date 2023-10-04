require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport')
const User= require('../models/user')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4001/api/auth/google/callback"
  },
    async function(accessToken, refreshToken, profile, done) {
        try{
        //   userProfile=profile;
        //   return done(null, userProfile);
        console.log("hello i am here",profile)
        const existingUser = await User.findOne({ 'googleId': profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }
          const newuser= await User.findOneAndUpdate(
            {'googleId': profile.id},
            {
                $set :{'googleId': profile.id, 'name': profile.displayName,'email':profile.emails[0].value}
            },   
             { upsert: true, new: true, setDefaultsOnInsert: true })
             if(!newuser){
                 return res.status(400).json({error:"something went wrong"})
             }
            //  console.log("==========>>>>>>>",newuser)
             return done(null,newuser)
      }catch(error){
        console.log(error);
        return res.status(500).json({mesage:"Something went wrong"})}
  }
));
module.exports=passport