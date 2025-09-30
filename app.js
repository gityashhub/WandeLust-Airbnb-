if(process.env.NODE_ENV !== "production"){
require("dotenv").config();}

const express = require("express");
const app = express();
const path=require("path");
const mongoose=require("mongoose");
const methodOverride= require("method-override");
const compression = require("compression");
const helmet = require("helmet");
const Listing = require("./models/listing.js");
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
const ejsMate=require("ejs-mate");
const wrapAsync= require("./utils/wrapAsync.js");
const ExpressError=require("./utils/Expresserror.js");
const {listingSchema, reviewSchema}=require("./schema.js");
const Review = require("./models/review.js");
const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const bookingsRouter = require("./routes/bookings.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const exp = require("constants");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User=require("./models/user.js");
const userRouter= require("./routes/user.js");

// Check for required environment variables
const requiredEnvVars = ['ATLASDB_URL', 'SECRET', 'CLOUD_NAME', 'CLOUD_API_KEY', 'CLOUD_API_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error('\n❌ ERROR: Missing required environment variables:');
    missingEnvVars.forEach(varName => {
        console.error(`   - ${varName}`);
    });
    console.error('\nPlease configure these secrets in the Replit Secrets tab.');
    console.error('Required secrets:');
    console.error('  ATLASDB_URL: MongoDB Atlas connection string');
    console.error('  SECRET: Session secret key');
    console.error('  CLOUD_NAME: Cloudinary cloud name');
    console.error('  CLOUD_API_KEY: Cloudinary API key');
    console.error('  CLOUD_API_SECRET: Cloudinary API secret\n');
    process.exit(1);
}

app.use(compression());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:", "http:"],
            connectSrc: ["'self'"]
        }
    }
}));

app.use(express.static(path.join(__dirname,"public"), {
    maxAge: '1d',
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
        if (path.endsWith('.css') || path.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
        } else if (path.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=604800');
        }
    }
}));
app.use(express.urlencoded({extended:true, limit: '10mb'}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
// Removed duplicate declaration of store

app.use(flash());
app.use('/uploads', express.static('uploads'));

const MONGO_URL=process.env.ATLASDB_URL 
main().then(()=>{console.log("connection successfull")})
.catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);
}

const store = MongoStore.create({
  mongoUrl : MONGO_URL,
  crypto: {
      secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600
});

store.on("error", (err) => {
  console.log("Error in mongo session storing",err);
});

app.use(session({
  store: store,
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : false,    
  //defining cookie variables
  cookie : {
      expires : Date.now() + 7 * 24 * 60 * 60 * 1000, //when the cookie will be deleted
      maxAge : 7 * 24 * 60 * 60 * 1000,
      httpOnly : true,
  }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/",(req,res)=>{
  res.redirect("/listings");
});

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  next();
})

app.use((req,res,next)=>{
  res.locals.error=req.flash("error");
  next();
})

app.use((req,res,next)=>{
res.locals.cUser=req.user;
  next();
} );

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/bookings", bookingsRouter);
app.use("/",userRouter)

app.all("*", (req, res,next) => {
  next(new ExpressError(404,"Page not found"));
});


app.use((err, req , res , next)=>{
  let {statusCode=500,message}=err;
  res.status(statusCode).render("error.ejs",{message});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`server listening on port ${PORT}`);
})
