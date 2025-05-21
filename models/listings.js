const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const ListingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
  //   image: {
  //   filename: {
  //     type: String,
  //     default: "defaultImage",
  //   },
  //   url: {
  //     type: String,
  //     default:
  //       "https://dreamhomeinspiration.com/wp-content/uploads/2024/01/Mexican-style-villa-outdoor-exterior-patio-with-pool.jpg",
  //     set: (v) =>
  //       v === ""
  //         ? "https://dreamhomeinspiration.com/wp-content/uploads/2024/01/Mexican-style-villa-outdoor-exterior-patio-with-pool.jpg"
  //         : v,
  //   },
  // },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
    },
    reviews: [
      {
        type : Schema.Types.ObjectId,
        ref : "Review"
      }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },  
});

// Adding a middleware to delete all the reviews from the listing as soon as the listing is deleted
ListingSchema.post("findOneAndDelete", async(listing) => {
  if(listing){
    await Review.deleteMany({ _id: {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;