const express=require("express");
const app=express();
const port=8000;
app.get("/",(req,res)=>{
    return res.send("hello there");
});
app.get("/login",(req,res)=>{
    return res.send("you are on login page");
});
app.get("/hitesh",(req,res)=>{
    res.send("Hitesh uses instagram and lco");
})
app.listen(port,()=>{
    console.log("server is up and running...");
});
const admin=(req,res)=>{
    res.send("this is admin dashboard");
};
let i=1;
const isAdmin=(req,res,next)=>{
    i+=1;
    console.log("isAdmin is running");
    if(i<5){next();}
    else(res.send("sorry"));
}

app.get("/admin",isAdmin,admin);
