const express = require("express");
let router = express.Router();


router.get("/admin/dashboard", (req, res) => {
  res.render("admin/dashboard", { layout: "admin/admin-layout" });
});

router.get("/admin/products", async (req, res) => {
  let products=[
    {
      title: "Carrot",
      description: "Fresh and crunchy carrots",
      price: 2.5,
      isFeatured: true
    },
    {
      title: "Broccoli",
      description: "Green broccoli rich in vitamins",
      price: 3.0,
      isFeatured: false
    },
    {
      title: "Spinach",
      description: "Organic spinach with iron",
      price: 1.5,
      isFeatured: true
    },
    {
      title: "Tomato",
      description: "Ripe and juicy tomatoes",
      price: 2.0,
      isFeatured: false
    }
  ];
  res.render("admin/products", { layout: "admin/admin-layout", products });
});

router.get("/admin/create",(req,res)=>{
  res.render("admin/create",{ layout: "admin/admin-layout" });
})

router.get("/admin/categories",(req,res)=>{
  res.render("admin/categories",{ layout: "admin/admin-layout" })
});


module.exports = router;