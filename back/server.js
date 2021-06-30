const express = require("express")
const path = require('path')
const configg = require("./config.js");
const mongoose=require("mongoose");
const userRoute= require("./routes/userRoute.js");
const productRoute=require("./routes/productRoute.js");
const bodyParser=require("body-parser");
const session = require("client-sessions");
const dotenv =require("dotenv");
const cors =require('cors')
dotenv.config();

const mongoDBUrl = configg.MONGODB_URL;



mongoose
  .connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => console.log(err.message,mongoDBUrl,1));

const app = express();
console.log(__dirname);
//app.use(express.static(path.join(__dirname,"../front/build")))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../front/build')));

// Express serve up index.html file if it doesn't recognize route


app.use(
  session({
    secret: "keyboard cat",
    cookieName: "session",
    activeDuration: 5 * 30 * 10000,
    httpOnly: true,
    secure: false,
    ephemeral: true,
  })
);
app.use("/api/users", userRoute);

app.use("/api/products", productRoute);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/build', 'index.html'),function(err){
    if(err){
      console.log(err);
      res.status(500).send(err)
    }
  });
});
/*app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  const product = data.products.find((x) => x._id == productId);
  console.log(product);
  product
    ? res.send(product)
    : res.status(404).send({ message: "Product not found ." });
});*/

  // Exprees will serve up production assets
 


app.listen((process.env.PORT||8080), () => {
  console.log("Server on port 8080");
});
