const User = require('../../../models/user');
const crypto = require('crypto');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const sendEmail = require('../../../helpers/emailSend')
const apiResponse = require('../../../helpers/apiResponse')
const httpStatus = require('http-status');
const { sendSms, verifySms } = require('../../../helpers/twilio')

exports.register = async (req, res) => {
  try {
    // console.log("==========,",req.body)
    let uniqEmail = await User.findOne({ email: req.body.email })
    if (uniqEmail) { return res.status(httpStatus.NOT_ACCEPTABLE).json({ error: "Email Already Exist" }); }

    const key = crypto.createHash("sha256").update(req.body.password).digest("hex");
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: key,
      gender: req.body.gender,
      contact: req.body.contact,
      dob: req.body.dob,
      bloodgroup: req.body.bloodgroup,
      tested_positive:req.body.tested_positive,
      tested_negative:req.body.tested_negative,
      covid_symptoms:req.body.covid_symptoms,
      covid_vaccine:req.body.covid_vaccine,
      location:req.body.location,
      // country: req.body.country,
      // state: req.body.state,
      // city: req.body.city,
      // pin: req.body.pin,
      // addressline: req.body.addressline,
    });
    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: "something went wrong" });
    }
    // // Create token
    const token = jwt.sign(
      { user_id: user._id, user_email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" });
    // save user token
    // user.token = token;
    res.cookie("jwt", token, { httpOnly: true, });

    return res.status(httpStatus.CREATED).json({ user, message: "Registration done sucessfully" })
  } catch (err) {
    console.log(err)
    // return res.staus(500).json(err, "Something went wrong");
    return apiResponse.ErrorResponse(res, err)
  }

}


exports.login = async (req, res) => {
  try {
    const key = crypto.createHash("sha256").update(req.body.password).digest("hex");

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "You are not authenticated.. please Sign up" });
    }
    if (key != user.password) {
      return res.status(httpStatus.NOT_ACCEPTABLE).json({ error: "Incorrect password" });
    }
    if (key == user.password && req.body.email == user.email) {
      const token = jwt.sign({ user_id: user._id, user_email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h', });
      // user.token = token;
      res.cookie("jwt", token, { httpOnly: true, });
      return res.status(httpStatus.OK).json({ user, token, message: "Log In successfull" })
    }
    res.status(httpStatus.BAD_REQUEST).send("Invalid Credentials");
  } catch (err) {
    console.log(err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" })

  }
},


  exports.forgetPassword = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json("Invalid email")
      }
      const resetToken = jwt.sign({ user_id: user._id, user_email: user.email }, process.env.JWT_SECRET, { expiresIn: "20m", });
      console.log("resettoken", resetToken)
      const link = `${process.env.BASE_URL}/password-reset/${user._id}/${resetToken}`;
      await sendEmail(user.email, "Password reset", link);
      // console.log(link);
      return res.status(httpStatus.OK).json({ link: link, message: "email has been send check your email" })
    } catch (err) {
      console.log(err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" })

    }
  },


  exports.resetPassword = async (req, res) => {
    try {
      if (req.body.password !== req.body.confirmpassword) {
        return res.status(httpStatus.NOT_ACCEPTABLE).json({ error: 'password does not match' })
      }
      const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
      // console.log(decoded,"decoded");
      if (decoded) {
        const key = crypto.createHash("sha256").update(req.body.password).digest("hex");
        const pwdupdate = await User.findByIdAndUpdate(req.body.id, { $set: { password: key } });
        // console.log(pwdupdate);
        if (!pwdupdate) {
          return res.status(httpStatus.NOT_FOUND).json({ error: "Something wenty wrong try again latter" })
        }

        return res.status(httpStatus.OK).json({ pwdupdate, message: "Password updated sucessfully" })
      }
      return res.status(httpStatus.BAD_REQUEST).json({ error: "token expire plz try again latter" })

    } catch (err) {
      console.log(err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" })

    }
  },


  exports.verifyEmailSend = async (req, res) => {
    try {

      let user = await User.findOne({ email: req.body.email })
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({ error: "plz enter a valid email" })
      }
      const verifyEmailToken = jwt.sign({ user_id: user._id, user_email: user.email }, process.env.JWT_SECRET, { expiresIn: "15m", });
      // console.log("--------",verifyEmailToken)
      const link = `${process.env.BASE_URL}/verifyemailsend/${user._id}/${verifyEmailToken}`;
      await sendEmail(user.email, "Varify Email", link);
      return res.status(httpStatus.OK).json({ link: link, verifyEmailToken: verifyEmailToken, message: "link has been send check your email" })
    } catch (err) {
      console.log(err)
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" })
      // return apiResponse.ErrorResponse(res,"something went wrong")
    }
  }


exports.verifyEmailResponse = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
    if (!decoded) res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid link" });
    return res.status(httpStatus.OK).json({ message: "Email verfied sucessfully" })
  } catch (err) {
    console.log(err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" })
  }
},


  exports.sendOtp = async (req, res) => {
    try {
      const phone = req.body.phone

      sendSms(phone).then(result => {
        // console.log(result, "Final result");
        if (result) res.status(httpStatus.OK).json({ msg: "otp has been send to your contact_no please verify" })
      });

      // const Sent_Data = await sendSms(phone);
      // console.log(Sent_Data, "Final result Await")

    } catch (err) {
      console.log(err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" })

    }
  },


  exports.verifyOtp = async (req, res) => {
    try {
      const phone = req.body.phone;
      const otp = req.body.otp;
      verifySms(phone, otp).then(result =>{
        if(result.status!='approved')
        { 
          return res.status(httpStatus.UNAUTHORIZED).json({error:"wrong otp please try again"})
        }
      }).catch(error=>console.log(error))
      return res.status(httpStatus.OK).json({ message: "otp verified sucessfully" })
    } catch (err) {
      console.log(err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" })

    }

  }

  
exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt")
    req.logOut();
    console.log('logout  successfully')

    return res.status(httpStatus.OK).json({ message: "user logout successfully" })
  } catch (err) {
    console.log(err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" })

  }

}


