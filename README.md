# 🏡 WanderLust – Your Hotel Booking Platform

WanderLust is a full-stack web application inspired by Airbnb, enabling users to create, explore, and book property listings. Built with Node.js, Express, MongoDB, and modern security practices, it offers a complete hotel booking experience with role-based access control.

## 🚀 Live Demo
[Click here to visit the website](https://bookhotel-3jiz.onrender.com/)

---

## 📸 Screenshots

### Homepage & Property Listings
Browse through beautiful property listings

![Homepage - Property Listings](assets/screenshots/homepage.png)

### Key Pages & Features

#### User Authentication
- **Signup Page**: Register as Customer or Hotel Owner with role selection
- **Login Page**: Secure authentication with Passport.js

#### Property Management
- **Property Details**: Detailed view with images, pricing, location, and reviews
- **Create Listing**: Hotel owners can add new properties with Cloudinary image uploads
- **Edit Listing**: Manage and update property information

#### Booking System
- **Customer Bookings**: View and manage your hotel reservations
- **Owner Dashboard**: Track and manage bookings for your properties
- **Booking Details**: View complete booking information and status

#### Admin Panel
- **Admin Dashboard**: System-wide statistics and analytics
- **User Management**: View all users, update roles, and manage accounts
- **System Monitoring**: Track listings, bookings, reviews, and revenue

> **Note**: Add more screenshots to `assets/screenshots/` directory as you capture different pages and features of the application.

---

## ✨ Features

### 👥 Role-Based Access System
The application supports three distinct user roles:

**Customer**
- Browse and search property listings
- Book hotels and manage reservations
- Leave reviews and ratings on properties
- View booking history and status

**Hotel Owner**
- Create and manage property listings
- Upload property images via Cloudinary
- View and manage bookings for their properties
- Respond to customer reviews
- Access owner dashboard with booking statistics

**Admin**
- Full system access and control
- Comprehensive admin dashboard with system statistics
- User management (view, update roles, delete users)
- Monitor all listings, bookings, and reviews
- View revenue and booking analytics

### 🔐 Security Features
- Secure authentication using Passport.js with local strategy
- Protected routes with custom middleware
- Admin accounts can only be created manually in database (no public registration)
- Session management with MongoDB store
- Password hashing and secure session secrets
- Helmet.js for security headers
- Input validation with Joi

### 🏨 Booking System
- Complete booking workflow: pending → confirmed/cancelled → completed
- Instant booking status updates
- Customer booking history
- Owner booking management dashboard
- Booking cancellation handling

### 🖼️ Image Management
- Property image uploads via Cloudinary
- Secure cloud storage
- Optimized image delivery
- Multiple format support (PNG, JPG, JPEG)

### 💬 Review System
- Star rating system (1-5 stars)
- Text reviews for properties
- Edit and delete own reviews
- Review author authentication
- Average rating calculation

### ⚡ Performance & Optimization
- Compression middleware for faster response times
- Static file caching with optimized headers
- Database query optimization
- Session storage in MongoDB for scalability

---

## 🧠 Technologies Used

### Backend
- **Node.js v22.11.0** – JavaScript runtime
- **Express.js** – Web application framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **Passport.js** – Authentication middleware
- **Express Session** – Session management

### Frontend
- **EJS** – Server-side templating engine
- **Bootstrap** – Responsive CSS framework
- **Custom CSS** – Enhanced styling and animations

### Third-Party Services
- **Cloudinary** – Cloud-based image storage and delivery
- **MongoDB Atlas** – Cloud database hosting
- **Connect-Mongo** – MongoDB session store

### Security & Validation
- **Helmet** – Security headers
- **Joi** – Schema validation
- **Passport-Local-Mongoose** – User authentication

---

## 📁 Project Structure

```
WanderLust/
├── app.js                      # Main application entry point
├── cloudConfig.js              # Cloudinary configuration
├── schema.js                   # Joi validation schemas
├── middleware.js               # Custom middleware (auth, authorization)
├── package.json                # Dependencies and scripts
│
├── models/
│   ├── booking.js              # Booking model
│   ├── listing.js              # Property listing model
│   ├── review.js               # Review model
│   └── user.js                 # User model with roles
│
├── controllers/
│   ├── bookings.js             # Booking logic
│   ├── listings.js             # Listing CRUD operations
│   ├── reviews.js              # Review management
│   └── users.js                # User authentication & admin functions
│
├── routes/
│   ├── bookings.js             # Booking routes
│   ├── listings.js             # Listing routes
│   ├── reviews.js              # Review routes
│   └── user.js                 # Authentication & admin routes
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs     # Main layout template
│   ├── includes/
│   │   ├── navbar.ejs          # Navigation bar
│   │   └── footer.ejs          # Footer
│   ├── listings/
│   │   ├── index.ejs           # All listings page
│   │   ├── show.ejs            # Single listing details
│   │   ├── new.ejs             # Create listing form
│   │   └── edit.ejs            # Edit listing form
│   ├── bookings/
│   │   ├── index.ejs           # Customer bookings
│   │   ├── owner.ejs           # Owner booking dashboard
│   │   └── show.ejs            # Booking details
│   ├── admin/
│   │   ├── dashboard.ejs       # Admin dashboard
│   │   └── users.ejs           # User management
│   ├── users/
│   │   ├── signup.ejs          # User registration
│   │   └── login.ejs           # User login
│   └── error.ejs               # Error page
│
├── public/
│   ├── css/
│   │   ├── style.css           # Main styles
│   │   └── rating.css          # Star rating styles
│   └── js/
│       └── script.js           # Client-side JavaScript
│
└── utils/
    ├── Expresserror.js         # Custom error class
    └── wrapAsync.js            # Async error wrapper
```

---

## ⚙️ Installation & Setup


1. **Fork or Import** this repository

2. **Configure Environment Secrets(.env) in root directory**
   
   ```
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

3. **Get MongoDB Atlas Connection String**
   - Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a cluster and database
   - Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

4. **Get Cloudinary Credentials**
   - Create a free account at [cloudinary.com](https://cloudinary.com)
   - Find your credentials in the dashboard
   - Copy Cloud Name, API Key, and API Secret
     

### Local Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/gityashhub/WandeLust-Airbnb-.git
   cd WandeLust-Airbnb-
   ```

2. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Create Environment File**
   
   Create a `.env` file in the root directory:
   ```env
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   ```

4. **Run the Application**
   ```bash
   node app.js
   ```
   
   Open `http://localhost:5000` in your browser

---

## 👤 User Roles & Access

### Customer Account
1. Visit `/signup`
2. Fill in username, email, password
3. Select "Customer" role
4. Sign up and start booking!

### Hotel Owner Account
1. Visit `/signup`
2. Fill in username, email, password
3. Select "Hotel Owner" role
4. Sign up and start listing properties!

### Admin Account Setup

**Important:** Admin accounts cannot be created through the signup form for security reasons.

**Steps to Create Admin:**

1. **Create a regular user account** (Customer or Hotel Owner)

2. **Access your MongoDB database**
   - Log into MongoDB Atlas
   - Click "Browse Collections"
   - Find the `users` collection

3. **Update the user's role to admin**
   
   In MongoDB Atlas UI:
   - Find your user document
   - Edit the `role` field
   - Change value to `admin`
   - Save changes

   Or using MongoDB Shell:
   ```javascript
   db.users.updateOne(
     { username: "your_username" },
     { $set: { role: "admin" } }
   )
   ```

4. **Login with admin credentials**
   - You'll be automatically redirected to `/admin/dashboard`
   - Access all admin features

### Admin Dashboard Features
- **System Statistics**: Total users, listings, bookings, reviews
- **User Management**: View all users, update roles, delete accounts
- **Role Analytics**: Distribution of customers, owners, and admins
- **Booking Statistics**: Revenue tracking and status breakdown
- **Recent Activity**: Latest users, listings, and bookings

---

## 🧪 Testing the Application

### As a Customer
1. Sign up as a customer
2. Browse available listings
3. View listing details and reviews
4. Create a booking for available dates
5. View your bookings at `/bookings`
6. Leave reviews on properties you've visited

### As a Hotel Owner
1. Sign up as a hotel owner
2. Create a new listing with details and images
3. View your listings
4. Edit or delete your properties
5. Access owner dashboard at `/bookings/owner`
6. Manage bookings for your properties

### As an Admin
1. Create admin account in database (see above)
2. Login with admin credentials
3. Access admin dashboard at `/admin/dashboard`
4. View system statistics and analytics
5. Manage users at `/admin/users`
6. Update user roles or remove accounts

---

## 🔒 Security Best Practices

- Admin role can only be assigned via database (no public registration)
- All passwords are hashed using Passport-Local-Mongoose
- Session secrets stored securely in environment variables
- Protected routes require authentication
- Role-based authorization middleware
- Input validation on all forms
- Security headers via Helmet
- Secure session management with httpOnly cookies

---

## 📱 API Routes

### Authentication Routes
- `GET /signup` - Registration page
- `POST /signup` - Create new account
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Listing Routes
- `GET /listings` - View all listings
- `GET /listings/new` - Create listing form (Hotel Owner)
- `POST /listings` - Create new listing (Hotel Owner)
- `GET /listings/:id` - View listing details
- `GET /listings/:id/edit` - Edit listing form (Owner/Admin)
- `PUT /listings/:id` - Update listing (Owner/Admin)
- `DELETE /listings/:id` - Delete listing (Owner/Admin)

### Review Routes
- `POST /listings/:id/reviews` - Add review (Logged in)
- `DELETE /listings/:id/reviews/:reviewId` - Delete review (Author/Admin)

### Booking Routes
- `GET /bookings` - View customer bookings (Customer)
- `GET /bookings/owner` - View owner bookings (Hotel Owner)
- `POST /bookings` - Create new booking (Customer)
- `PUT /bookings/:id/confirm` - Confirm booking (Owner/Admin)
- `PUT /bookings/:id/cancel` - Cancel booking (Owner/Admin)
- `PUT /bookings/:id/complete` - Complete booking (Owner/Admin)

### Admin Routes
- `GET /admin/dashboard` - Admin dashboard (Admin only)
- `GET /admin/users` - User management (Admin only)
- `POST /admin/users/:userId/role` - Update user role (Admin only)
- `POST /admin/users/:userId/delete` - Delete user (Admin only)

---

## 🛠️ Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - ODM
- [Passport](http://www.passportjs.org/) - Authentication
- [Cloudinary](https://cloudinary.com/) - Image hosting
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [EJS](https://ejs.co/) - Templating engine

---

## 🔧 Future Enhancements

- Payment gateway integration (Stripe)
- Email notifications for bookings
- SMS alerts via Twilio
- Real-time messaging between guests and owners
- Advanced search with filters (price, amenities, location)
- Interactive maps for property locations
- Wishlist/favorites system
- Calendar-based availability view
- Multi-language support
- Mobile app version

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👏 Acknowledgements

- Inspired by [Airbnb](https://www.airbnb.com/)
- Image hosting by [Cloudinary](https://cloudinary.com/)
- Database hosting by [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 📧 Contact & Support

For questions, issues, or suggestions, please open an issue on GitHub or contact the maintainers.

**Happy Hosting! 🏡✨**
