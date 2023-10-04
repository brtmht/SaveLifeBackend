var express = require('express');
const authRoutes= require('../controllers/api/auth/authRoute')
const bloodReqRoute= require('../controllers/api/bloodReq/bloodReqRoute')
const profileRoute=require('../controllers/api/profile/profileRoute')
const plasmaRoute=require('../controllers/api/plasma/plasmaRoute')
const apiRouter = express.Router();


// route for auth
apiRouter.use("/auth",authRoutes)
// route for blood request
apiRouter.use("/bloodreq",bloodReqRoute)
// route for profile
apiRouter.use("/profile",profileRoute)
// route for plasma
apiRouter.use("/plasma",plasmaRoute)


module.exports = apiRouter;
