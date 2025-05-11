const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const app = express();
const Listing = require('./models/listings.js');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded ({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const MONGO_URL='mongodb://127.0.0.1:27017/tripTide_DB';

main()
.then(() =>{
    console.log("Database connected successfully");
})
.catch((err) =>{
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}


app.get("/", wrapAsync(async (req,res) =>{
    const allListings = await Listing.find({});
    // console.log(listings);
    return res.render("listings/index.ejs", {allListings});
}));

// index route
app.get("/all", wrapAsync(async (req,res) =>{
    const allListings = await Listing.find({});
    // console.log(listings);
    return res.render("listings/index.ejs", {allListings});
}));

// // rediect to all listings
// app.get("/all", (req,res) =>{
//     res.redirect("/all");
// });

// new route
app.get("/listings/new", (req,res)=>{
   return res.render("listings/new.ejs");
});

// show route
app.get("/show/:id", wrapAsync(async (req,res) =>{
    const {id} =req.params;
    const listing = await Listing.findById(id);
    return res.render("listings/show.ejs", {listing});

}));

// create route
app.post("/listings", wrapAsync(async(req,res,next) =>{
    if(!req.body.listing) {
        throw new ExpressError(400, "Send a valid data for listing");
}
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    return res.redirect("/");
}));

// edit route
app.get("/show/:id/edit" ,wrapAsync(async (req,res) => {
    const {id} =req.params;
    const listing = await Listing.findById(id);
    return res.render("listings/edit.ejs", {listing});
}));

// update route
app.put("/show/:id", wrapAsync(async (req,res) =>{
    if(!req.body.listing) {
        throw new ExpressError(400, "Send a valid data for listing");
    }
    const {id} =req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    return res.redirect(`/show/${id}`);
}));

// Delete route
app.delete("/show/:id", wrapAsync(async (req,res) =>{
    const {id} = req.params;
    const deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    return res.redirect("/all");
}));

// app.get("/testListing", async(req,res) =>{
//     let sampleLists = new Listing({
//         title: "Santorini Villa",
//         description: "A picturesque island in the Aegean Sea, famous for its whitewashed houses, blue domes, and breathtaking sunsets.",
//         price: 2500,
//         location: "Santorini, Greece",
//         country: "Greece",
//     });
//     await sampleLists.save();
//     res.send("Testing is successful");
//     console.log("Running...");
// });

// Custom error for any other routes apart from the ones defined above
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})

// handling Async errors
app.use((err, req, res, next) =>{
    let {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).render("error.ejs", {err});
})

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
})
