# WanderLust - Airbnb Clone

## Overview
WanderLust is a full-stack web application inspired by Airbnb. It enables users to create, explore, and book property listings with features including user authentication, image uploads via Cloudinary, and a review system.

## Project Architecture
- **Frontend**: EJS templates served by Express on port 5000
- **Backend**: Express.js with MongoDB (Mongoose ODM)
- **Authentication**: Passport.js with local strategy
- **File Storage**: Cloudinary for image uploads
- **Session Store**: MongoDB session storage

## Tech Stack
- Node.js 20.x
- Express.js
- MongoDB + Mongoose
- EJS templating
- Passport.js for authentication
- Cloudinary for image storage
- Bootstrap for UI

## Project Structure
```
├── app.js                 # Main application file
├── models/               # Mongoose models (User, Listing, Review)
├── routes/               # Express routes
├── controllers/          # Route controllers
├── views/               # EJS templates
├── public/              # Static assets (CSS, JS)
├── middleware.js        # Custom middleware
├── cloudConfig.js       # Cloudinary configuration
└── utils/               # Utility functions
```

## Required Environment Variables
The application requires the following secrets to be configured in Replit Secrets:

1. **ATLASDB_URL** - MongoDB Atlas connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority`
   
2. **SECRET** - Session secret key for encryption
   - Any secure random string
   
3. **CLOUD_NAME** - Cloudinary cloud name
   
4. **CLOUD_API_KEY** - Cloudinary API key
   
5. **CLOUD_API_SECRET** - Cloudinary API secret

## Recent Changes (September 30, 2025)
- Configured for Replit environment
- Updated server to listen on 0.0.0.0:5000 for Replit proxy compatibility
- Installed dependencies with --legacy-peer-deps flag due to cloudinary version conflict
- Set up workflow to run Express server
- Implemented role-based access control system:
  - Added role field to User model (customer, hotel_owner, admin)
  - Created Booking model for hotel reservations
  - Added role-based middleware for access control
  - Updated routes with role-specific permissions
  - Created booking system for customers
  - Updated UI to show role-specific options

## Role-Based System
### User Roles:
1. **Customer** - Can browse hotels, book hotels, view and cancel their bookings, leave reviews
2. **Hotel Owner** - Can create, edit, and delete their own hotel listings
3. **Admin** - Full access to all features, can manage all listings and view all bookings

### Key Features:
- Role selection during signup
- Role-specific navigation and UI
- Customers can only book (not create listings)
- Hotel owners can only create/manage listings (not book)
- Admin can manage everything and view all bookings
- Booking system with check-in/check-out dates and guest count

## Development
- Server runs on port 5000
- Access via Replit webview
- Hot reload not configured - restart workflow after code changes

## Known Issues
- Cloudinary v2.6.1 has peer dependency conflict with multer-storage-cloudinary@4.0.0
  - Resolved by installing with --legacy-peer-deps flag

## User Preferences
- Implemented role-based access control as requested
- Three distinct user types: Admin, Hotel Owners, and Customers
- Separate sections and permissions for each role
