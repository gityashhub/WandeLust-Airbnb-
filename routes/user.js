const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});
module.exports = router;

router.post("/signup", wrapAsync(userController.signup));

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login",saveRedirectUrl,passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
    userController.login);

router.get("/logout",userController.logout);


module.exports = router;