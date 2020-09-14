const express=require("express");
const router=express.Router();

const {getUserById,getUser,sendAllUser,updateUser,userPurchaseList}=require("../controllers/user");
const {isAdmin,isAuthenticated,isSignedin}=require("../controllers/auth");



router.param("userId",getUserById);

router.get("/user/:userId", isSignedin  , isAuthenticated ,getUser);
router.put("/update/:userId", isSignedin, isAuthenticated,updateUser);
router.get("/orders/user/:userId",isSignedin,isAuthenticated,userPurchaseList);

module.exports=router;


