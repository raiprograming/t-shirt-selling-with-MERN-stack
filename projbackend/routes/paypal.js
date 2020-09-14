const {getToken,processPayment} =require("../controllers/paypal")
const express=require("express");
const { isSignedin, isAuthenticated } = require("../controllers/auth");
const router=express.Router();
const { getUserById } = require("../controllers/user");

router.param("userId",getUserById);

router.get("/payment/getToken/:userId",isSignedin,isAuthenticated,getToken);
router.post("/payment/braintree/:userId",isSignedin,isAuthenticated,processPayment)

module.exports=router;