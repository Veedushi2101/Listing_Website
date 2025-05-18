const express = require('express');
const Listing = require('../models/listings.js');
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const {listingSchema} = require("../schema.js");
const router = express.Router();
const flash = require("connect-flash");

/* -----------------------------------------Middlewares-------------------------------------------------------- */

// Middleware for validating listing data
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        next(new ExpressError(400, errMsg));
    } else {
        next();
    }
};


// new route
router.get("/new", (req,res)=>{
   return res.render("listings/new.ejs");
});

// show route
router.get("/:id", wrapAsync(async (req,res) =>{
    const {id} =req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error", "Listing not found");
        return res.redirect("/");
    }
    return res.render("listings/show.ejs", {listing});

}));

// create route
router.post("/", validateListing, wrapAsync(async(req,res,next) =>{ 
    const newListing = new Listing(req.body.listing);
    req.flash("success", "New listing created successfully!");
    await newListing.save();
    return res.redirect("/");
}));
 
// edit route
router.get("/:id/edit" ,wrapAsync(async (req,res) => {
    const {id} =req.params;
    const listing = await Listing.findById(id);
    req.flash("success", "Listing Edited successfully!");
    if(!listing){
        req.flash("error", "Listing not found");
        return res.redirect("/");
    }
    return res.render("listings/edit.ejs", {listing});
}));

// update route
router.put("/:id", wrapAsync(async (req,res) =>{
    if(!req.body.listing) {
        throw new ExpressError(400, "Send a valid data for listing");
    }
    const {id} =req.params;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing updated successfully!");
    if(!listing){
        req.flash("error", "Listing not found");
        return res.redirect("/");
    }
    return res.redirect(`/listings/${id}`);
}));

// Delete route
router.delete("/:id", wrapAsync(async (req,res) =>{
    const {id} = req.params;
    const deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success", "Listing deleted successfully!");
    return res.redirect("/all");
}));

module.exports = router;