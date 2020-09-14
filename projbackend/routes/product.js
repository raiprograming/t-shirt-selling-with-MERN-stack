const express=require("express");
const router=express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const {isSignedin,isAuthenticated,isAdmin}=require("../controllers/auth");
const {getUserById} = require("../controllers/user");


//all of params
router.param("userId",getUserById);
router.param("productId",getProductById);

//all routes
//create route
router.post("/product/create/:userId",
 isSignedin, isAuthenticated, isAdmin,
 createProduct
);
//read routes
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//delete route

router.delete("/product/:productId/:userId",
    isSignedin,
    isAuthenticated,
    isAdmin,
    deleteProduct);

//update route
router.put(
  "/product/:productId/:userId",
  isSignedin,isAuthenticated,
  isAdmin,
  updateProduct
);



//listing route
router.get("/products",getAllProducts);

router.get("/products/categories",getAllUniqueCategories);



module.exports=router;