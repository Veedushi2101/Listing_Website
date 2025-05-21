const User = require("../models/user");

module.exports.getSignUp = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.postSignUp = async (req,res) => {
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
};


module.exports.getLogin = (req,res) =>{
    res.render("users/login.ejs");
};

module.exports.postLogin = (req,res) => {
    const redirectUrl = res.locals.redirectUrl || "/";
    req.flash("success", "Welcome back!");
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if((err)){
            return next(err);
        }
        req.flash("success", "You Logged Out!");
        res.redirect("/");
    })
};