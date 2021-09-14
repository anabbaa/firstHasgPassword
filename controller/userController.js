const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const  mongoose = require("mongoose");
const app = require("../app");
const userControllers = {};


//get all
userControllers.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  //post add new user
  userControllers.addNewUser = async (req, res) => {
    const userCheck = await User.findOne({ username: req.body.username });
    if (userCheck) {
      return res.status(400).send("This username is already been used");
    }
  
    try {
      //   const saltRounds = 10
      //   const salt = await bcrypt.genSalt(saltRounds);
      //   const hashedPassword = await bcrypt.hash(req.body.password,salt);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //   console.log(hashedPassword);
      const newUser = await new User({
          _id: mongoose.Types.ObjectId(),
          username: req.body.username,
          password: hashedPassword,

      });
      newUser.save();
      res.status(201).json({ message: "New user been added ✅", newUser });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  //post log in

  userControllers.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user == null) {
      return res.status(404).send("User Not found.");
    }
  
    try {
      if(await bcrypt.compare(req.body.password, user.password)){
        res.send("Cool welcome");
      }
      else{
        res.send("Not Allowed");

      }
    } catch (err) {
      res.status(err.status).json({ message: err.message });
    }
  };
  
  module.exports = userControllers;
  