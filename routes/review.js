const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/listings.js');
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema} = require("../schema.js");
const Review = require('../models/reviews.js');
const flash = require("connect-flash");
const {isLoggedIn, isReviewAuthor, validateReview} = require("../middleware.js");
const controller = require("../controllers/reviews.js");


// Reviews Route making Post request
router.post("/", isLoggedIn, validateReview, wrapAsync(controller.createReview));

// Reviews Route making Delete request
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(controller.destroyReview));
module.exports = router;