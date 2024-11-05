const express=require("express");
let app=express();
app.set("view engine","ejs");
app.use(express.static("public")); 
app.listen(5000,()=>{
    console.log("server started at local host");
});

app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/cv",(req,res)=>{
    res.render("cv")
})






