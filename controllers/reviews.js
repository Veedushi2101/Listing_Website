const Listing = require("../models/listings");
const Review = require("../models/reviews");

module.exports.createReview = async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review added successfully!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res) => {
    const {id, reviewId} = req.params;
    const res1 = await Listing.findByIdAndUpdate(id, {$pull :{reviews:reviewId}});
    const res2 =await Review.findByIdAndDelete(reviewId);
    console.log(res1);
    console.log(res2);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);

};