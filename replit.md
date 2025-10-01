# WanderLust - Airbnb Clone

## Overview
WanderLust is a full-stack web application inspired by Airbnb, enabling users to create, explore, and book property listings. Built with Node.js, Express, MongoDB, and Cloudinary for image storage.

## Project Structure
- **Backend**: Express.js server with MongoDB (Mongoose)
- **Frontend**: EJS templating with Bootstrap
- **Authentication**: Passport.js with local strategy
- **Image Storage**: Cloudinary for uploads
- **Session Storage**: MongoDB session store

## Key Features
- User authentication (signup/login/logout)
- Create and manage property listings
- Upload images via Cloudinary
- Review system for listings
- Booking functionality
- Flash messages for user feedback
- Secure route protection with middleware

## Technical Stack
- **Runtime**: Node.js v22.11.0
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Template Engine**: EJS with ejs-mate
- **File Upload**: Multer + Cloudinary
- **Authentication**: Passport.js
- **Validation**: Joi
- **Security**: Helmet, compression

## Required Environment Variables
The application requires the following secrets to be configured in Replit:

1. **ATLASDB_URL**: MongoDB Atlas connection string
2. **SECRET**: Session secret key for secure sessions
3. **CLOUD_NAME**: Cloudinary cloud name
4. **CLOUD_API_KEY**: Cloudinary API key
5. **CLOUD_API_SECRET**: Cloudinary API secret

## Server Configuration
- **Port**: 5000 (configured for Replit)
- **Host**: 0.0.0.0 (allows external connections)
- **Environment**: Development (uses dotenv for local secrets)

## Recent Changes
- 2025-10-01: Initial Replit setup completed
- Configured for Replit environment with proper port and host settings
- Added comprehensive error handling for missing environment variables
- Implemented role-based access control with three user roles:
  - Customer: Can browse and book hotels
  - Hotel Owner: Can list properties and manage bookings for their hotels
  - Admin: Full system access with dashboard and user management
- Added Hotel Owner Dashboard at /bookings/owner showing all bookings for their properties
- Created comprehensive Admin Panel at /admin/dashboard with system statistics
- Added user management interface for admins at /admin/users
- Implemented booking workflow: pending → confirmed/cancelled → completed
- Updated navbar with role-specific navigation links
- **Security Enhancement**: Removed public admin registration - admin accounts can only be created manually in database
- Implemented automatic redirect: admins are redirected to /admin/dashboard upon login

## Important Notes
- The app checks for required environment variables on startup
- Missing secrets will prevent the app from starting with clear error messages
- All dependencies are already installed via package.json
- Static files are served from /public directory with caching headers
- Session data is stored in MongoDB for persistence

## Admin Access Setup
Admin accounts cannot be created through the signup form for security reasons. To create an admin account:

1. **Create a regular user** through the signup form (choose Customer or Hotel Owner role)
2. **Access your MongoDB database** (using MongoDB Atlas UI or MongoDB Compass)
3. **Find the user** in the `users` collection
4. **Update the user's role** to 'admin':
   ```javascript
   // In MongoDB shell or Compass
   db.users.updateOne(
     { username: "your_username" },
     { $set: { role: "admin" } }
   )
   ```
5. **Login with those credentials** - you'll automatically be redirected to /admin/dashboard

### Admin Dashboard Features
- View system statistics (users, listings, bookings, reviews)
- User management (view all users, update roles, delete users)
- Role distribution analytics
- Recent activity monitoring
- Booking statistics and revenue tracking
