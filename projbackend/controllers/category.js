const Category=require("../models/category");

exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,cat)=>{
        if(err){
            return res.status(400).json({
                error:"category not found"
            })
        }
        req.category=cat;
        next();
    })
}

//create
exports.createCategory=(req,res)=>{
    const name=req.body.name;
    const cat=new Category(req.body);
    cat.save((err,cate)=>{
        if (err) {
            return res.status(400).json({
                error: "not able to create category"
            })
        }
        return res.json(cate);
    })
}
//read
exports.getCategory=(req,res)=>{
    return res.json(req.category);
}
 //getAll
exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,cats)=>{
        if (err) {
            return res.status(400).json({
                error: "category not found"
            })
        }
        return res.json(cats);
    })
}
//update
exports.updateCategory=(req,res)=>{
    const category=req.category;
    category.name=req.body.name;
    category.save((err,cat)=>{
        if (err) {
            return res.status(400).json({
                error: "failed to update category"
            })
        }
        return res.json(cat);  
    })
}
//delete
exports.removeCategory=(req,res)=>{
    const category=req.category;
    category.remove((err,cat)=>{
        if (err) {
            return res.status(400).json({
                error: "NOT ABLE TO DELETE"
            })
        }
        return res.json(cat)
    })
}

