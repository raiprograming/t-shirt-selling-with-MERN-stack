const Product=require("../models/product");
const formidable=require("formidable");
const _=require("lodash");
const fs=require("fs");
const { sortBy } = require("lodash");
//const { findOneAndUpdate } = require("../models/product");



exports.getProductById=(req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"product not found"
            });
        }
        req.product=product;
        next();
    })

}


exports.createProduct=(req,res)=>{
    let form= new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }

        //restrictions on field
        const {price,name,description,category,stock}=fields;
        if(
            !name || !description || !price || !category || !stock
        ){
            return res.status(400).json({
                error:"please include all field"
            });
        }



        let product=new Product(fields);
        //handle file here

        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"file size too big"
                })
            }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;


        }

        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"saving t-shirt failed"
                })
            }
            res.json(product);
        })
    });


}



exports.getProduct=(req,res)=>{
    req.product.photo=undefined;
    return res.json(req.product);
}
//middleware
exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}

//delete controller
exports.deleteProduct=(req,res)=>{
    let product=req.product;
    product.remove((err,deletedproduct)=>{
        if(err){
            return res.status(400).json({
                error:"failed to delete"
            })
        }
        res.json({
            msg:"deletion was a success",
            deletedproduct
        })
    })
}
//update controller
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image",
        });
      }

      
      //updation code
      let product = req.product;
      product=_.extend(product,fields);
      //handle file

      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "file size too big",
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }

      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "updating product failed",
          });
        }
        res.json(product);
      });
    });


};

//prodyct listing
exports.getAllProducts=(req,res)=>{
    let limit=req.query.limit? parseInt(req.query.limit) : 8
    let sortBy=req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"no product found"
            })
        }
        res.json(products);
    })
}


exports.updateStock = (req, res, next) => {
    console.log(req.body.order.products)
    console.log(req.body.order.products);

  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -1, sold: 1 } },
      }
    };
  });
  console.log(typeof myOperations)
  console.log(myOperations)

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};
exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"no category found"
            })
        }
        return res.json(category);

    })
}


