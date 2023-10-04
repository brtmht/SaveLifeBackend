var passport = require('passport')
let FacebookStrategy = require('passport-facebook').Strategy;
const User= require('../models/user')
require('dotenv').config();

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret:process.env.CLIENT_SECRET_FB,
    callbackURL: "http://localhost:4001/api/auth/facebook/secrets"
  },
  async (accessToken, refreshToken, profile, done) => {

    try {
      const existingUser = await User.findOne({ 'facebookId': profile.id });
      if (existingUser) {
          console.log("+++++++++++++++",existingUser)
        return done(null, existingUser);
      }
    //   const newuser = await User.create({facebookId: profile.id,name: profile.displayName,})     
              const newuser= await User.findOneAndUpdate(
                  {'facebookId': profile.id},
                  {
                      $set :{'facebookId': profile.id, 'name': profile.displayName,}
                  },   
                   { upsert: true, new: true, setDefaultsOnInsert: true })

          if(!newuser){
              console.log("unable to store user detail in database")
            }
      console.log("===========", newuser)
      return done(null,newuser)
    } catch (err) {
      console.log(err)
    }

  }
));
  module.exports = passport;