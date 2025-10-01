const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isCustomer, isAdmin, isHotelOwnerOrAdmin } = require("../middleware.js");
const bookingController = require("../controllers/bookings.js");

router.post("/:id", isLoggedIn, isCustomer, wrapAsync(bookingController.createBooking));

router.get("/my", isLoggedIn, isCustomer, wrapAsync(bookingController.myBookings));

router.get("/all", isLoggedIn, isAdmin, wrapAsync(bookingController.allBookings));

router.get("/owner", isLoggedIn, isHotelOwnerOrAdmin, wrapAsync(bookingController.ownerBookings));

router.post("/:bookingId/status", isLoggedIn, isHotelOwnerOrAdmin, wrapAsync(bookingController.updateBookingStatus));

router.get("/:bookingId", isLoggedIn, wrapAsync(bookingController.showBooking));

router.post("/:bookingId/cancel", isLoggedIn, wrapAsync(bookingController.cancelBooking));

module.exports = router;
