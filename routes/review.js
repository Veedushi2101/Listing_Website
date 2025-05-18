const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/listings.js');
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const { reviewSchema} = require("../schema.js");
const Review = require('../models/reviews.js');
const flash = require("connect-flash");
/* -----------------------------------------Middlewares-------------------------------------------------------- */

// Middleware for validating review data
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        next(new ExpressError(400, errMsg));
    } else {
        next();
    }
};

// Reviews Route making Post request
router.post("/", validateReview, wrapAsync( async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review added successfully!");
    res.redirect(`/listings/${listing._id}`);
}))

// Reviews Route making Delete request
router.delete("/:reviewId", wrapAsync(async(req,res) => {
    const {id, reviewId} = req.params;
    const res1 = await Listing.findByIdAndUpdate(id, {$pull :{reviews:reviewId}});
    const res2 =await Review.findByIdAndDelete(reviewId);
    console.log(res1);
    console.log(res2);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);

}))
module.exports = router;