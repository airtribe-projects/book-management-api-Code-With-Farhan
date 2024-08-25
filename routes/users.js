require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [];

router.post("/register", async(req,res) => {
    const {userName, password, role} = req.body;
    const userExists = users.find(x => x.userName === userName);
    if(userExists) {
        return res.status(400).json({message: "User already exists"});
    }
    const hashedPass = await bcrypt.hash(password,10);
    users.push({userName, password: hashedPass, role});
    res.status(201).json({message: "User successfully created"});
});

router.post("/login", async(req,res) => {
    const {userName, password} = req.body;
    const user = users.find(x => x.userName === userName);
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