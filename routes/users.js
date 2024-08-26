require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/users");

router.post("/register", async(req,res) => {
    const { name, age, userName, password, role} = req.body;
    if (!userName || !name || !age || !password) {
        return res.status(400).json({ message: 'All fields are required except role' });
    }
    let userExists = await User.findOne({userName});
    if(userExists) {
        return res.status(400).json({message: "User already exists"});
    }
    const hashedPass = await bcrypt.hash(password,10);
    user = new User({
      userName,
      name,
      age,
      password: hashedPass,
      role
    });
    const dbUser = await User.create(user);
    res.send(dbUser);
});

router.post("/login", async(req,res) => {
    const {userName, password} = req.body;
    const user = User.findOne({userName});
    console.log(user);
    if(!user) {
        return res.status(400).json({message: "user does not exist"});
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        return res.status(400).json({message: "password is incorrect"});
    }
    const token = jwt.sign({userName: user.userName, role: user.role}, process.env.SECRET_KEY);
    res.json({token});
});

module.exports = router;