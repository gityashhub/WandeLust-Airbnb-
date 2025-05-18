const cloudinary = require('cloudinary').v2; //npm i cloudinary 
const { CloudinaryStorage } = require('multer-storage-cloudinary'); //npm install multer-storage-cloudinary --legacy-peer-deps

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
    //here the env variables can be named anythig but the config variablrs are thedefault ones
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlustDev',
      allowedFormats: ["png","jpg","jpeg"], // supports promises as well
    },
});

module.exports = {
    cloudinary,
    storage
}