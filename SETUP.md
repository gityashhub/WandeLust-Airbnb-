# WanderLust Setup Guide for Replit

## Quick Start

This application is now configured to run on Replit. Follow these steps to get it running:

## Step 1: Configure Required Secrets

The application requires 5 environment secrets to function. Add these in the Replit Secrets tab:

### Required Secrets:

1. **ATLASDB_URL**
   - Your MongoDB Atlas connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority`
   - [Get MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)

2. **SECRET**
   - A random string for session encryption
   - Example: `your-super-secret-key-change-this-to-random-string`
   - Generate a secure random string (at least 32 characters)

3. **CLOUD_NAME**
   - Your Cloudinary cloud name
   - Found in your [Cloudinary Dashboard](https://cloudinary.com/console)

4. **CLOUD_API_KEY**
   - Your Cloudinary API key
   - Found in your Cloudinary Dashboard

5. **CLOUD_API_SECRET**
   - Your Cloudinary API secret
   - Found in your Cloudinary Dashboard (requires sign-in)

### How to Add Secrets in Replit:
1. Click on the "Tools" tab in the left sidebar
2. Click on "Secrets"
3. Add each secret with the exact name and corresponding value
4. Click "Add new secret" for each one

## Step 2: Set Up MongoDB Atlas (if needed)

If you don't have a MongoDB Atlas account:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier M0)
4. Create a database user with username and password
5. Add your IP to the whitelist (or use 0.0.0.0/0 for development)
6. Get your connection string and add it as ATLASDB_URL secret

## Step 3: Set Up Cloudinary (if needed)

If you don't have a Cloudinary account:

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. From the dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret
4. Add these as secrets in Replit

## Step 4: Initialize Sample Data (Optional)

After the app is running, you can optionally seed the database with sample listings:

```bash
node init/index.js
```

Note: You'll need to update the owner ID in `init/index.js` to match a user created in your application.

## Step 5: Start the Application

Once all secrets are configured:

1. The Server workflow should automatically start
2. Access your application through the Replit webview
3. The app will be available on port 5000

## Features

- **User Authentication**: Sign up and log in
- **Create Listings**: Add property listings with images
- **Browse Listings**: Explore available properties
- **Reviews**: Leave reviews on listings
- **Image Upload**: Upload property images via Cloudinary

## Troubleshooting

### Application won't start
- Check that all 5 secrets are configured correctly
- Verify MongoDB Atlas connection string is valid
- Check the Console tab for specific error messages

### Images won't upload
- Verify Cloudinary credentials are correct
- Check that CLOUD_NAME, CLOUD_API_KEY, and CLOUD_API_SECRET are set

### Can't connect to database
- Verify ATLASDB_URL is correct
- Check MongoDB Atlas IP whitelist includes your IP or 0.0.0.0/0
- Ensure database user has proper permissions

## Development Notes

- Server runs on `0.0.0.0:5000` (configured for Replit proxy)
- Frontend uses EJS templates
- Static files served from `/public`
- Session data stored in MongoDB

## Need Help?

Check the application console logs for detailed error messages.
