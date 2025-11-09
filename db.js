const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;
// const mongoURL = process.env.MONGODB_URL_LOCAL;

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

// Add lesner
db.on('connected', () => {
    console.log("Connected to mongoDB Atlas server");
})
db.on('error', (err) => {
    console.log("mongoose connection error:", err);
})
db.on('diconnected', () => {
    console.log("mongoDB Disconnected");
})

// export db 
module.exports = db;