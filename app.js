if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};
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
const session = require("express-session");
const flash = require("connect-flash");
const User = require("./models/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");


// Router
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

/* -----------------------------------------Session-------------------------------------------------------- */
const sessionOptions = {
    secret: "secretCode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    }
};
app.use(session(sessionOptions));
app.use(flash());

/* -----------------------------------------Passport-------------------------------------------------------- */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

// Creating a flash message
app.use((req,res,next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currentUser = req.user; // to access the current user in the views
    next();
})

// Creating a fake user
app.get("/fakeUser", async (req,res) => {
    let fakeUsers = new User({
        email: "fakuser@example.com",
        username: "fakuser"
    });
    const newUser = await User.register(fakeUsers, "fakepassword"); //this is used to login the user 
    res.send(newUser);
})


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
/* -----------------------------------------Home Page----------------------------------------------------------- */

// // rediect to all listings
// app.get("/all", (req,res) =>{
//     res.redirect("/all");
// });

/* -----------------------------------------Router----------------------------------------------------------- */
// Router
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

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
    console.log(err);
    let {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).render("error.ejs", {err});
})

/* -----------------------------------------Listening Port------------------------------------------------------ */
app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
})
/* --------------------------x---------x-----------END----------x-------------x--------------------------------- */