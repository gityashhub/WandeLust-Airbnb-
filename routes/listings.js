const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError=require("../utils/Expresserror.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");
const { isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer'); 
const {storage} = require("../cloudConfig.js"); //Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
const upload = multer({storage});
 // Import the storage object from cloudinary 
 // The destination folder where the uploaded files will be stored. In this case, it is set to 'uploads/'.


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




router.post("/", isLoggedIn, upload.single("image"), validateListing, listingController.createlisting,);

router.get("/new",isLoggedIn,(req,res)=>{
res.render("./listings/new.ejs");
})


router.get("/:id", wrapAsync(listingController.showlisting));


// listings.js
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));



router.put("/:id", isLoggedIn, isOwner, upload.single("image"), listingController.updateListing);



router.delete("/:id",isOwner,isLoggedIn,listingController.destroyListing);

  module.exports = router;