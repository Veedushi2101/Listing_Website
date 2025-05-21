const Listing = require("../models/listings");
const ExpressError = require("../utils/expressError");


module.exports.newListing = (req,res)=>{
   return res.render("listings/new.ejs");
}

module.exports.showListing = async (req,res) =>{
    const {id} =req.params;
    const listing = await Listing.findById(id)
    .populate( {path: "reviews", populate: {path: "author"}})
    .populate("owner");
    // console.log(listing);
    if(!listing){
        req.flash("error", "Listing not found");
        return res.redirect("/");
    }
    return res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async(req,res,next) =>{ 
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    req.flash("success", "New listing created successfully!");
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    return res.redirect("/");
};

module.exports.editListing =async (req,res) => {
    const {id} =req.params;
    const listing = await Listing.findById(id);
    req.flash("success", "Listing Edited successfully!");
    if(!listing){
        req.flash("error", "Listing not found");
        return res.redirect("/");
    }
    let currentImage = listing.image.url;
    newImage = currentImage.replace("/upload", "/upload/w_300");
    return res.render("listings/edit.ejs", {listing, newImage});
};


module.exports.updateListing = async (req,res) =>{
    if(!req.body.listing) {
        throw new ExpressError(400, "Send a valid data for listing");
    }
    const {id} =req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing not found");
        return res.redirect("/");
    }
    const updatedListing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    let url = req.file.path;
    let filename = req.file.filename;
    if(typeof req.file!== "undefined"){
        listing.image = { url, filename };
        updatedListing.image = { url, filename };
        await updatedListing.save();
    }
    req.flash("success", "Listing updated successfully!");
    return res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req,res) =>{
    const {id} = req.params;
    const deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success", "Listing deleted successfully!");
    return res.redirect("/all");
};