const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveUrl } = require('../middleware.js');

/* -----------------------------------------signUp-------------------------------------------------------- */
router.get("/signup", (req,res) => {
    res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync(async (req,res) => {
    try{
        const {username, email, password} =req.body;
        const newUser = new User({username, email});
        const registeredUser = await User.register(newUser, password);
        // implementing the login function after registering the user
        req.login(registeredUser, (err) => {   
        if((err)){
            return next(err);
        }
        req.flash("success", "User registered successfully!");
        res.redirect("/");
    })
    }
    catch(error){
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}));

/*-----------------------------------------Login----------------------------------------------------------- */
router.get("/login", (req,res) =>{
    res.render("users/login.ejs");
});

const auth = {
    failureFlash: true,
    failureRedirect: "/login"
};

router.post("/login" , saveUrl, passport.authenticate("local", auth), (req,res) => {
    const redirectUrl = res.locals.redirectUrl || "/";
    req.flash("success", "Welcome back!");
    res.redirect(redirectUrl);
});

/*-----------------------------------------Logout----------------------------------------------------------- */
router.get("/logout", (req,res,next) => {
    req.logout((err) => {
        if((err)){
            return next(err);
        }
        req.flash("success", "You Logged Out!");
        res.redirect("/");
    })
})

module.exports = router;