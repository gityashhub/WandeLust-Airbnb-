const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl, isAdmin} = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(userController.signup));

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login",saveRedirectUrl,passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
    userController.login);

router.get("/logout",userController.logout);

router.get("/admin/dashboard", isAdmin, wrapAsync(userController.adminDashboard));

router.get("/admin/users", isAdmin, wrapAsync(userController.manageUsers));

router.post("/admin/users/:userId/role", isAdmin, wrapAsync(userController.updateUserRole));

router.post("/admin/users/:userId/delete", isAdmin, wrapAsync(userController.deleteUser));

module.exports = router;