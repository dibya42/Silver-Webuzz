const express = require('express');
const router = express.Router();

const userController= require("../controller/userController");
const bookingController = require("../controller/bookingController");
const Middleware = require("../Middleware/auth");


//------------------------------USER API -----------------------------------***

router.post("/register",userController.createUser);

router.post('/login',  userController.login);

//----------------------------- BOOKING API-------------***

router.post("/booking", Middleware.Mid1, bookingController.bookingForm);

module.exports = router;