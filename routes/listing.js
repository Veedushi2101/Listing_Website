const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, validateListing, isOwner} = require("../middleware.js");
const controller = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// create route
router.post("/", isLoggedIn, 
     upload.single("listing[image]"), 
     validateListing,
     wrapAsync(controller.createListing));

// new route
router.get("/new", isLoggedIn, controller.newListing );

router.route("/:id")
.get(wrapAsync(controller.showListing))     // show route
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(controller.updateListing))     // update route
.delete(isLoggedIn, isOwner, wrapAsync(controller.destroyListing));  // delete route

// edit route
router.get("/:id/edit" ,isLoggedIn, isOwner, wrapAsync(controller.editListing));

module.exports = router;