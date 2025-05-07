const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const app = express();
const Listing = require('./models/listings.js');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded ({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"public")));

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


app.get("/", (req,res) =>{
    res.send("Root is working");
});

// index route
app.get("/all", async(req,res) =>{
    const allListings = await Listing.find({});
    // console.log(listings);
    res.render("listings/index.ejs", {allListings});
});

// rediect to all listings
app.get("/all", (req,res) =>{
    res.redirect("/all");
});

// new route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
});

// show route
app.get("/show/:id", async (req,res) =>{
    const {id} =req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

// create route
app.post("/listings", async(req,res) =>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/all");
});

// edit route
app.get("/show/:id/edit" ,async (req,res) => {
    const {id} =req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

// update route
app.put("/show/:id", async(req,res) =>{
    const {id} =req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/show/${id}`);
});

// Delete route
app.delete("/show/:id", async(req,res) =>{
    const {id} = req.params;
    const deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/all");
});

app.get("/testListing", async(req,res) =>{
    let sampleLists = new Listing({
        title: "Santorini Villa",
        description: "A picturesque island in the Aegean Sea, famous for its whitewashed houses, blue domes, and breathtaking sunsets.",
        price: 2500,
        location: "Santorini, Greece",
        country: "Greece",
    });
    await sampleLists.save();
    res.send("Testing is successful");
    console.log("Running...");
});

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
})
