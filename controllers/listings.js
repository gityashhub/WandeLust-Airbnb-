const Listing = require('../models/listing');

module.exports.index = async(req,res)=>{
    const allListings =  await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
    }

module.exports.createlisting = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");
    }

module.exports.showlisting = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({
      path: "reviews",
      populate: { path: "author" }
    })
    .populate("owner");
    if (!listing) {
      throw new ExpressError(404,"Listing not found");
    }
    res.render("listings/show.ejs", { listing });
  }


module.exports.editListing=async (req, res) => {
     let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing does not exist");
        res.redirect("/listings");
    }
    let originalListingUrl = listing.image.url;
    originalListingUrl = originalListingUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalListingUrl});
}


module.exports.updateListing = async (req, res) => {

let { id } = req.params;

let updateeListing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    updateeListing.image = {url,filename};
    await updateeListing.save();
}
req.flash("success", "Listing Updated!");
res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  }

  