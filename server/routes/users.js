var express = require('express');
var router = express.Router();
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const config = require("config")
const {
    createToken
} = require("../middleware/jwtauth")
const {
    successResponse,
    serverError,
    alreadyExist,
    unauthorized
} = require("../helper/response");
const {
    create
} = require('../models/user');

//register new user
router.post("/register", async (req, res) => {
    const {
        email,
        password,
    } = req.body;
    await User.find({
        email
    }).then(async (data) => {
        if (data) return alreadyExist(res, "User Already Exists");
        let newUser = new User(req.body);
        let salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save().then(async (data) => {
            let payload = {
                user: data
            }
            let token = await ceateToken(payload, '24h');
            successResponse(res, token, "User registered successfully")
        })
    }).catch(err => {
        console.log(err, "register new user error");
        serverError(res, "Server error")
    })
})

//login user
router.post("/login", async (req, res) => {
    const {
        email,
        password
    } = req.body;
    console.log(req.body);
    successResponse(res, req.body, "messge")
    await User.find({
            email
        }).then(async (data) => {
            if (!data) return unauthorized(res, 'Invalid credentials');
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return unauthorized(res, 'Invalid credentials');
            let payload = {
                user: data,
            }
            return payload;
        })
        .then(async (payload) => {
            return createToken(payload, '24h')
        })
        .then(async (token) => {
            successResponse(res, token, "User LoggedIn successfully")
        })
        .catch(err => {
            console.log(err, "ERROR");
            serverError(res, "Server Error")
        })
})
module.exports = router;