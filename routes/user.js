const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveUrl } = require('../middleware.js');
const controller = require("../controllers/users.js");
/* -----------------------------------------signUp-------------------------------------------------------- */
router.route("/signup")
    .get(controller.getSignUp)
    .post(wrapAsync(controller.postSignUp));
/*-----------------------------------------Login----------------------------------------------------------- */
const auth = {
    failureFlash: true,
    failureRedirect: "/login"
};    
router.route("/login")
.get(controller.getLogin)
.post(saveUrl, passport.authenticate("local", auth), controller.postLogin);

/*-----------------------------------------Logout----------------------------------------------------------- */
router.get("/logout", controller.logout);
module.exports = router;