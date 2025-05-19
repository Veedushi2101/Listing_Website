module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {   //check if the user is authenticated
        req.session.redirectUrl = req.originalUrl; //store the original URL in the session
        req.flash("error", "You must be signed in!");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl; //store the original URL in the locals
        console.log(res.locals.redirectUrl);
    }
    next();
}