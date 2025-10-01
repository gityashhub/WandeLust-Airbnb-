const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");

module.exports.createBooking = async (req, res) => {
    const { id } = req.params;
    const { checkIn, checkOut, guests } = req.body;
    
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate <= today) {
        req.flash("error", "Check-in date must be in the future");
        return res.redirect(`/listings/${id}`);
    }

    if (checkOutDate <= checkInDate) {
        req.flash("error", "Check-out date must be after check-in date");
        return res.redirect(`/listings/${id}`);
    }

    const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = listing.price * days;

    const newBooking = new Booking({
        listing: id,
        customer: req.user._id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: parseInt(guests),
        totalPrice,
        status: 'pending'
    });

    await newBooking.save();
    req.flash("success", "Booking request submitted successfully! Waiting for hotel owner confirmation.");
    res.redirect(`/bookings/${newBooking._id}`);
};

module.exports.showBooking = async (req, res) => {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
        .populate('listing')
        .populate('customer');
    
    if (!booking) {
        req.flash("error", "Booking not found");
        return res.redirect("/listings");
    }

    const isCustomer = String(booking.customer._id) === String(req.user._id);
    const isOwner = booking.listing && String(booking.listing.owner) === String(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isCustomer && !isOwner && !isAdmin) {
        req.flash("error", "You are not authorized to view this booking");
        return res.redirect("/listings");
    }

    res.render("bookings/show.ejs", { booking });
};

module.exports.myBookings = async (req, res) => {
    const bookings = await Booking.find({ customer: req.user._id })
        .populate('listing')
        .sort({ createdAt: -1 });
    
    res.render("bookings/index.ejs", { bookings });
};

module.exports.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
        req.flash("error", "Booking not found");
        return res.redirect("/bookings/my");
    }

    if (String(booking.customer) !== String(req.user._id) && req.user.role !== 'admin') {
        req.flash("error", "You are not authorized to cancel this booking");
        return res.redirect("/bookings/my");
    }

    booking.status = 'cancelled';
    await booking.save();
    req.flash("success", "Booking cancelled successfully");
    res.redirect("/bookings/my");
};

module.exports.allBookings = async (req, res) => {
    const bookings = await Booking.find()
        .populate('listing')
        .populate('customer')
        .sort({ createdAt: -1 });
    
    res.render("bookings/all.ejs", { bookings });
};

module.exports.ownerBookings = async (req, res) => {
    const ownerListings = await Listing.find({ owner: req.user._id });
    const listingIds = ownerListings.map(listing => listing._id);
    
    const bookings = await Booking.find({ listing: { $in: listingIds } })
        .populate('listing')
        .populate('customer')
        .sort({ createdAt: -1 });
    
    res.render("bookings/owner.ejs", { bookings, ownerListings });
};

module.exports.updateBookingStatus = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
        req.flash("error", "Invalid status");
        return res.redirect("/bookings/owner");
    }
    
    const booking = await Booking.findById(bookingId).populate('listing');
    
    if (!booking) {
        req.flash("error", "Booking not found");
        return res.redirect("/bookings/owner");
    }

    if (String(booking.listing.owner) !== String(req.user._id) && req.user.role !== 'admin') {
        req.flash("error", "You are not authorized to update this booking");
        return res.redirect("/bookings/owner");
    }

    booking.status = status;
    await booking.save();
    req.flash("success", `Booking ${status} successfully`);
    res.redirect("/bookings/owner");
};
