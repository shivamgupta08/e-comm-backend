// const session = require("express-session");
// const express = require("express");
// const MongoStore = require("connect-mongo")(session);
// const mongoose = require("mongoose");
// // mongoose.connect("mongodb://localhost:27017/e-comm-dashboard");

// const app = express();

// mongoose.Promise = global.Promise;
// const mongo_uri =
//   "mongodb+srv://sgshivamgupta14:Gupta@sc@123@cluster0.wwibpqk.mongodb.net/?retryWrites=true&w=majority";

// const connect = mongoose.connect(mongo_uri, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });
// connect.then(
//   (db) => {
//     console.log("Database Connected Successfully");
//   },
//   (err) => {
//     console.log("Error occur while connecting ", err);
//   }
// );

// app.use(
//   session({
//     secret: "thisisasecretkey",
//     resave: true,
//     saveInitialized: true,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   })
// );
// ------
const mongoose = require("mongoose");

const url =
  "mongodb+srv://sgshivamgupta14:ecommdashshivam123@cluster0.wwibpqk.mongodb.net/e-comm-dashboard?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then((db) => {
    console.log("Connected to database ", db.models.products);
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

// /-------
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://sgshivamgupta14:ecommdashshivam123@cluster0.wwibpqk.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
//   const collection = client.db("e-comm-dashboard").collection("products");
//   console.log(collection);
//   // perform actions on the collection object

//   client.close();
// });
