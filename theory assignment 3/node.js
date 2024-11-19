const express=require("express");
let app=express();
const layout=require("express-ejs-layouts");
app.use(layout);

app.set("view engine","ejs");
app.use(express.static("public")); 

app.listen(5000,()=>{
    console.log("server started at local host");
});

app.get("/",(req,res)=>{
    res.render("home")
})

let productsRouter = require("./routes/admin/products.router");
app.use(productsRouter);

