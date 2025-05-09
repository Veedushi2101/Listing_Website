const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ListingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    image: {
    filename: {
      type: String,
      default: "defaultImage",
    },
    url: {
      type: String,
      default:
        "https://dreamhomeinspiration.com/wp-content/uploads/2024/01/Mexican-style-villa-outdoor-exterior-patio-with-pool.jpg",
      set: (v) =>
        v === ""
          ? "https://dreamhomeinspiration.com/wp-content/uploads/2024/01/Mexican-style-villa-outdoor-exterior-patio-with-pool.jpg"
          : v,
    },
  },
    price:{
        type: Number,
        required: true,
    },
    location:{
        type:String,
    },
    country: {
        type: String,
    }
})

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;