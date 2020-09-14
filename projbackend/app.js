const mongoose=require("mongoose");
const express=require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const authRoute=require("./routes/auth");
const userRoute=require("./routes/user");
const categoryRoute=require("./routes/category");
const productRoute=require("./routes/product");
const orderRoute = require("./routes/order");
const stripeRoute=require("./routes/stripe");
const paymentRoute=require("./routes/paypal");

const port=process.env.PORT || 8000
const app=express();
mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED")
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//my routes

app.use("/api",authRoute);
app.use("/api",userRoute);
app.use("/api",categoryRoute);
app.use("/api",productRoute);
app.use("/api", orderRoute);
app.use("/api",stripeRoute);
app.use("/api",paymentRoute);




app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
});
app.get("/post",(req,res)=>{
    res.json({
        msg:"app running"
    })
})
