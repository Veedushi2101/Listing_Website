const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Listing = require('./models/listings.js');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");

// Router
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded ({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


/* -----------------------------------------Database Connection-------------------------------------------------- */
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

/* -----------------------------------------Home Page----------------------------------------------------------- */
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

/* -----------------------------------------Router----------------------------------------------------------- */
// Router
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

/* -----------------------------------------Test_CASE------------------------------------------------------------ */
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
/* ------------------------------------------------Test_CASE------------------------------------------------------------- */

/* -----------------------------------------Error Handlers------------------------------------------------------------- */
// Custom error for any other routes apart from the ones defined above
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})
// handling Async errors
app.use((err, req, res, next) =>{
    let {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).render("error.ejs", {err});
})

/* -----------------------------------------Listening Port------------------------------------------------------ */
app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
})
/* --------------------------x---------x-----------END----------x-------------x--------------------------------- */