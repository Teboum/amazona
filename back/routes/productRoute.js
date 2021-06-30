const express =require("express");

const { isAdmin, isAuth } =require("../util.js");

const mongoose = require("mongoose");
const router = express.Router();
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
});
const Product= mongoose.model("product", productSchema);


router.get("/", async (req, res) => {
  console.log(__dirname,2);
  try{
    const products = await Product.find();
    
    res.json(products);
  }catch(err){
    console.log(err);
  }

});

router.get("/:id", async (req, res) => {
  const products = await Product.findOne({ _id: req.params.id });
  if (products) {
    res.send(products);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  console.log("hello", req.body);
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,

    description: req.body.description,

    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    res.status(201).send({ message: "New Product Created", data: newProduct });
  }
  return res.status(500).send({ message: "Error to creating product" });
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  console.log(req.params.id);
  const productID = req.params.id;
  const product = await Product.findById(productID);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct)
      return res
        .status(200)
        .send({ message: "Product Updated", data: updatedProduct });
  }

  return res.status(500).send({ message: "Error to updating product" });
});

router.delete("/:id", isAuth, isAdmin, (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.send({ message: "Product Deleted" }))
    .catch((err) => res.send("Errorein deletion"));
});

module.exports=router;
