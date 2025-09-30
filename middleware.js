
const ExpressError = require("./utils/Expresserror.js");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "You must be signed in to do that");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
}
next();}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing || !listing.owner) {
        req.flash("error", "Listing not found or has no owner.");
        return res.redirect("/listings");
    }

    if (req.user.role === 'admin') {
        return next();
    }

    if (!res.locals.cUser || String(listing.owner) !== String(res.locals.cUser._id)) {
        req.flash("error", "You are not authorized to do that");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.isAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found.");
        return res.redirect(`/listings/${id}`);
    }

    if (!res.locals.cUser || String(review.author) !== String(res.locals.cUser._id)) {
        req.flash("error", "You are not authorized to do that");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    if (req.user.role !== 'admin') {
        req.flash("error", "You do not have admin privileges");
        return res.redirect("/listings");
    }
    next();
};

module.exports.isHotelOwner = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    if (req.user.role !== 'hotel_owner' && req.user.role !== 'admin') {
        req.flash("error", "Only hotel owners can perform this action");
        return res.redirect("/listings");
    }
    next();
};

module.exports.isCustomer = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    if (req.user.role !== 'customer') {
        req.flash("error", "Only customers can book hotels");
        return res.redirect("/listings");
    }
    next();
};

module.exports.isHotelOwnerOrAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    if (req.user.role !== 'hotel_owner' && req.user.role !== 'admin') {
        req.flash("error", "You do not have permission to access this");
        return res.redirect("/listings");
    }
    next();
};