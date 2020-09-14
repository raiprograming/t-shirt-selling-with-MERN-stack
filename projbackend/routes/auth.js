var express=require("express");
var Route=express.Router();
var {signout,signup, signin, isSignedin} =require("../controllers/auth");
const { check, validationResult } = require('express-validator');


Route.post("/signup",[
    check("name","name should be at least 3 char long").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be at least 3 char long").isLength({min:3})
],signup);

Route.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
], signin);





Route.get("/signout",signout);

/*Route.get("/testroute",(req,res)=>{
    res.send("this is test route");
})*/

module.exports=Route