const Listing = require('./models/listings.js');
const ExpressError = require("./utils/expressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require('./models/reviews.js');

// Check if the user is logged in
// If not, redirect to login page and store the original URL
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {   //check if the user is authenticated
        req.session.redirectUrl = req.originalUrl; //store the original URL in the session
        req.flash("error", "You must be signed in!");
        return res.redirect("/login");
    }
    next();
};

// Middleware to save the original URL before redirecting to login
// This middleware is used to redirect the user back to the original URL after login
module.exports.saveUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl; //store the original URL in the locals
        console.log(res.locals.redirectUrl);
    }
    next();
};


// Middleware for validating listing data
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        next(new ExpressError(400, errMsg));
    } else {
        next();
    }
};

// Middleware for checking if the user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
    const {id} =req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("error", "You are not authorized for this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Middleware for checking if the user is the author of the review
module.exports.isReviewAuthor = async (req, res, next) => {
    const {id, reviewId} =req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error", "You are not authorized for this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Middleware for validating review data
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        next(new ExpressError(400, errMsg));
    } else {
        next();
    }
};