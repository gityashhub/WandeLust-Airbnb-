const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError=require("../utils/Expresserror.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, isHotelOwnerOrAdmin } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer'); 
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
  
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };

router.get("/",wrapAsync(listingController.index));  




router.post("/", isLoggedIn, isHotelOwnerOrAdmin, upload.single("image"), validateListing, listingController.createlisting,);

router.get("/new", isLoggedIn, isHotelOwnerOrAdmin, (req,res)=>{
res.render("./listings/new.ejs");
})


router.get("/:id", wrapAsync(listingController.showlisting));


router.get("/:id/edit", isLoggedIn, isHotelOwnerOrAdmin, isOwner, wrapAsync(listingController.editListing));

router.put("/:id", isLoggedIn, isHotelOwnerOrAdmin, isOwner, upload.single("image"), listingController.updateListing);

router.delete("/:id", isLoggedIn, isHotelOwnerOrAdmin, isOwner, listingController.destroyListing);

  module.exports = router;