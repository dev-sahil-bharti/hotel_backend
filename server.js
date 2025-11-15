const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();
const passport = require('./authentication/auth') // import auth.js
const logRequest = require('./middleware/logRequest') // import logRequest.js


const bodyParser = require('body-parser')
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

//Use Middleware Function
app.use(logRequest)

// User Authentication implement
app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local', { session: false })

// route 1: Home
app.get('/', (req, res) => {
    res.send('Welcome to Sahil Villa Hotel')
})

// import routes
const personRoutes = require('./routes/Person_routes')
const menuRoutes = require('./routes/MenuItems_routes')

// use routes
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);


app.listen(PORT, () => {
    console.log("⚙️  Backend server is runnnig seccessfully");
})