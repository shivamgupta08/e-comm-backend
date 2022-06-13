const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm-dashboard";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = await result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) res.send({ result: "something went wrong" });
    else res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) res.send({ result: "something went wrong" });
        else res.send({ user, auth: token });
      });
    }
  } else res.send({ result: "No user found" });
});

app.post("/add-product", verifyToken, async (req, res) => {
  const product = new Product(req.body);
  let result = await product.save();
  if (result) res.status(200).send(result);
  else res.status(400).send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  const products = await Product.find();
  if (products.length) return res.send(products);
  else return res.send({ result: "No result found" });
});

app.delete("/products/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/products/:id", verifyToken, async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) return res.send(product);
  else return res.send({ result: "No result found" });
});

app.put("/products/:id", verifyToken, async (req, res) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Not Authorized" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ result: "Not Authorized" });
  }
}
app.listen(5000);
