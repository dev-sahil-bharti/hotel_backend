const express = require('express')
const app = express('express')

// Middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()} Request made to : ${req.originalUrl}]`);
    next() // move to the next phase
}
module.exports = logRequest