const express = require("express");

let router = express.Router();
let Product=require("../../models/product");
let Category=require("../../models/category");
router.get("/admin/dashboard", (req, res) => {
  res.render("admin/dashboard", { layout: "admin/admin-layout" });
});

router.get("/admin/products", async (req, res) => {
  let products=await Product.find();
  res.render("admin/products", { layout: "admin/admin-layout", products });
});

router.get("/admin/create",(req,res)=>{
  res.render("admin/create",{ layout: "admin/admin-layout" });
})

router.post("/admin/create", upload.single("productImage"), async (req, res) => {
  try {
    const { title, description, price, isFeatured } = req.body;
    const isFeaturedValue = isFeatured === "on";

    const product = await Product.create({
      title,
      description,
      price,
      isFeatured: isFeaturedValue,
      image: req.file ? req.file.filename : null, // Store the file name
    });

    console.log("Uploaded file:", req.file); // Debugging uploaded file
    console.log("Product created:", product);
    res.redirect("/admin/products");
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).send("Error creating product");
  }
});

router.get("/admin/products/edit/:id", async (req, res) => {
  
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("admin/product-edit-form", { 
      product, 
      layout: "admin/admin-layout" 
    });
 
});

router.post("/admin/products/edit/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { title, description, price, isFeatured } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      title,
      description,
      price,
      isFeatured: isFeatured === 'on',  
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }
    res.redirect("/admin/products");  
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send("Server error");
  }
}); 

router.get("/admin/products/delete/:id",async (req,res)=>{
  const product=await Product.findByIdAndDelete(req.params.id);
  return res.redirect("back");
});


router.get("/admin/categories",async (req,res)=>{
  const categories=await Category.find();
  res.render("admin/categories",{ layout: "admin/admin-layout" ,categories});
});

router.get("/admin/create-category",(req,res)=>{
  res.render("admin/create-category",{ layout: "admin/admin-layout"});
})

router.post("/admin/create-category",async (req,res)=>{
  const {title,description,numberOfItems} = req.body;
  const category=await Category.create({
    title,
    description,
    numberOfItems
  })
  res.redirect("/admin/categories");
})

router.get("/admin/categories/edit/:id",async (req,res)=>{
  const category=await Category.findById(req.params.id);
  if(!category){
    throw new Error("Category Not found");
  }
res.render("admin/categories-edit-form",{ 
  category, 
  layout: "admin/admin-layout" 
});
});


router.post("/admin/categories/edit/:id", async (req,res)=>{
    const { title, description, numberOfItems } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
      title,
      description,
      numberOfItems
    }, { new: true });

    if (!updatedCategory) {
      return res.status(404).send("Category not found");
    }
    res.redirect("/admin/categories");
})


router.get("/admin/categories/delete/:id",async (req,res)=>{
  const category=await Category.findByIdAndDelete(req.params.id);
  return res.redirect("back");
});



module.exports = router;