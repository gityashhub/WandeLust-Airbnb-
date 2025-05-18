const Listing = require('../models/listing.js');
const Review = require('../models/review.js');

module.exports.createReview = async(req,res)=>{
    const listing= await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Successfully created a new review!");
    res.redirect(`/listings/${listing._id}`);
    console.log(newReview);
    }


module.exports.destroyReview = async(req,res)=>{
    const {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:review}});
    await Review.findByIdAndDelete(review);
    req.flash("success", "Successfully deleted the review!"); 
    res.redirect(`/listings/${id}`);
    }