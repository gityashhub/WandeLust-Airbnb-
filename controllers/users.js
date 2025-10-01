const User = require("../models/user.js");



module.exports.signup=async (req, res) => {
    try {
        let {username , email , password, role}=req.body;
        
        // Prevent admin role assignment during signup
        if (role === 'admin') {
            req.flash("error", "Admin accounts can only be created manually in the database");
            return res.redirect("/signup");
        }
        
        const newUser = new User({ username, email, role: role || 'customer' });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, function(err) {
            if (err) { return next(err); }
            req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
        });
        console.log(registeredUser);
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}


module.exports.login=async(req, res) => {
    req.flash("success", " Welcome back to Wanderlust!");
    
    // Redirect admin users to admin dashboard
    if (req.user.role === 'admin') {
        return res.redirect("/admin/dashboard");
    }
    
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

}

module.exports.logout=(req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "Logged Out, visit again!");
        res.redirect("/listings");
      });
}

module.exports.adminDashboard = async (req, res) => {
    const User = require("../models/user.js");
    const Listing = require("../models/listing.js");
    const Booking = require("../models/booking.js");
    const Review = require("../models/review.js");

    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalReviews = await Review.countDocuments();

    const usersByRole = await User.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    const recentUsers = await User.find().sort({ _id: -1 }).limit(5);
    const recentListings = await Listing.find().populate('owner').sort({ _id: -1 }).limit(5);
    const recentBookings = await Booking.find()
        .populate('listing')
        .populate('customer')
        .sort({ createdAt: -1 })
        .limit(5);

    const bookingStats = await Booking.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 }, revenue: { $sum: "$totalPrice" } } }
    ]);

    res.render("admin/dashboard.ejs", {
        stats: {
            totalUsers,
            totalListings,
            totalBookings,
            totalReviews,
            usersByRole,
            bookingStats
        },
        recentUsers,
        recentListings,
        recentBookings
    });
};

module.exports.manageUsers = async (req, res) => {
    const users = await User.find().sort({ _id: -1 });
    res.render("admin/users.ejs", { users });
};

module.exports.updateUserRole = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;
    
    await User.findByIdAndUpdate(userId, { role });
    req.flash("success", "User role updated successfully");
    res.redirect("/admin/users");
};

module.exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    req.flash("success", "User deleted successfully");
    res.redirect("/admin/users");
};