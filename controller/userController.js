const express = require('express');
const userModels = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = (req,res) => {
    //hash password
    bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
        //create new user instance and store data
        const user = new userModels({
            username: req.body.username,
            password: hashedPassword,
        });
    //save new user
    user
    .save()
    .then((result) => {
        res.status(201).send({
            message: "User created successfully",
            result,
        });
    }) .catch((error) => {
res.status(500).send({
    message:"Error create user",
    error,
});
    });
})
.catch((e) => {
    res.status(500).send({
        message: "Password was not hashed successfully",
        e,
    });
});
};

const loginUser = (req,res) => {
    //check username exist
    userModels.findOne({username: req.body.username})
    //if user name exist
    .then((user) => {
        bcrypt.compare(req.body.password, user.password)
        //if password match
        .then((passwordCheck) => {
            if(!passwordCheck) {
                return res.status(400).send({
                    message: "Password does not match",
                    error,
                });
            }

            //create JWT token
            const token =jwt.sign(
                {
                    userID: user._id,
                    userName: user.username,
                },
                "Random-token",
                { expiresIn: "24"}
            );

            //return success response
            res.status(200).send({
                message: "Login Successful",
                error,
            });
        });
    }) .catch((e) => {
        res.status(404).send({
            message: "username not found",
            e,
        });
    });
};


module.exports = {
    registerUser,
    loginUser,
    freeEndpoint,
    authEndpoint,
};