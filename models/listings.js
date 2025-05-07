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
    image:{
        type: Object,
        default: {
            filename: 'listingimage',
            url: 'https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
          },
        set: (v) =>
            v===" "? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60": v,
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