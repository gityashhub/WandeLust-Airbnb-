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

## Development
- Server runs on port 5000
- Access via Replit webview
- Hot reload not configured - restart workflow after code changes

## Known Issues
- Cloudinary v2.6.1 has peer dependency conflict with multer-storage-cloudinary@4.0.0
  - Resolved by installing with --legacy-peer-deps flag

## User Preferences
None documented yet.
