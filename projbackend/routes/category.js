const express=require("express");
const router=express.Router();

const { getCategoryById, createCategory, getCategory,getAllCategory,updateCategory,removeCategory} = require("../controllers/category");
const {isAuthenticated,isSignedin ,isAdmin} = require("../controllers/auth");
const {getUserById } = require("../controllers/user");
const { route } = require("./user");
const { Router } = require("express");

router.param("userId",getUserById);
router.param("categoryId", getCategoryById);


router.post("/category/create/:userId", isSignedin ,isAuthenticated,isAdmin , createCategory);

router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);

router.put("/category/update/:categoryId/:userId", isSignedin, isAuthenticated, isAdmin,updateCategory);

router.delete("/category/delete/:categoryId/:userId", isSignedin, isAuthenticated, isAdmin, removeCategory);



module.exports=router;