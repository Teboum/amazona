const express =require("express");
const mongoose=require('mongoose')

const router = express.Router();


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true, //
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const User = mongoose.model("user", userSchema);

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Basir",
      email: "test@mail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(user);
  } catch (err) {
    res.send({ msg: err.message });
  }
});

router.post("/signin", async (req, res) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password,
  })
    .then((data) => {
      console.log(data,req.body,3);
      req.session.user = data._id;
      req.session.isAdmin = data.isAdmin;
      return res.send({
        _id: data._id,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
      });
    })
    .catch((err) => {
      console.log(err, "hello");
      return res.status(401).send({ msg: "invalid email or paswsword" });
    });
});
router.post("/register", async (req, res) => {
  console.log(req.body.email);
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });
  const newUser = user
    .save()
    .then(() => {
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });
    })
    .catch((err) => res.send(err));
});
module.exports=router;
