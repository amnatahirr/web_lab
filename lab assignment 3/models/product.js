const mongoose=require("mongoose");
let productSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },description:{
        type:String,
        required:true
    },price:{
        type:Number,
        required:true
    },
    isFeatured: { type: Boolean, default: false },
})
module.exports=mongoose.model("product",productSchema);