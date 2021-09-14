const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true ,
}
    ).
then(console.log("db is connected")).
catch((err)=>{
    console.log(`ther is a problem ${err.message}`);
});

const userControllers = require("./controller/userController");

app
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.addNewUser);
  app.route("/login").post(userControllers.login);

  module.exports = app;