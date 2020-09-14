const User=require("../models/user");
const { body, validationResult } = require('express-validator');
const user = require("../models/user");
var jwt=require("jsonwebtoken");
var expresssJwt=require("express-jwt");


exports.signup=(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            "error":errors.array()[0].msg
        })
    }


    const user=new User(req.body);
    user.save((err,usr)=>{
        if(err){
            return res.status(400).json({
                error:"not able to save user"
            });
        };
        res.json({
            "name":usr.name,
            "email":usr.email,
            "id":usr._id
        });
    })
};


exports.signin=(req,res)=>{
    const {email,password}=req.body;
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            "error": errors.array()[0].msg
        })
    }
    user.findOne({email},(err,usr)=>{
        if(err || !usr){
            return res.status(400).json({
                "error":"email does not exist"
            })
        }
        if (!usr.authenticate(password)){
            return res.status(401).json({
                "error":"password does not match"
            })
        }
        const token=jwt.sign({_id:usr._id},process.env.SECRET)
        res.cookie("token",token,{expire:new Date()+9999});
        const {_id,name,email,role}=usr;
        return res.json({token,user:{_id,name,email,role}})

    })
}



exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"user signed out successfully"
    })
};

//protected routes
exports.isSignedin=expresssJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
});

exports.isAuthenticated=(req,res,next)=>{
    let checker=req.profile && req.auth && req.profile._id == req.auth._id;
    console.log("unable to authenticate");
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        });
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error:"you r not admin"
        })
    }
    next();
};