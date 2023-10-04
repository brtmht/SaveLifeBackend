
// require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID;
const client = require('twilio')(accountSid, authToken);


const sendSms = (phone) => {
    try {
        return (new Promise((resolve, reject) => {

            client.verify.services(serviceId).verifications.create({
                to: `+91${phone}`, channel: 'sms'
            }).then(data => { resolve(data); }).catch(err => { reject(err); });

        }))
    } catch (err) {
        console.log(err)
        return err;
    }
}

const verifySms = (phone, otp) => {
    try {
        return (new Promise((resolve, reject) => {
        console.log("-----------",otp)
        client.verify.services(serviceId).verificationChecks.create({
                to: `+91${phone}`,code: otp
            }).then(data => { resolve(data); }).catch(err => { reject(err) });
        }))

    } catch (err) { console.log("=================",err) }

}

module.exports = { sendSms: sendSms, verifySms: verifySms };