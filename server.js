const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();

const bodyParser = require('body-parser')
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000


// route 1: Home
app.get('/', (req, res) => {
    res.send('Welcome to Sahil Villa Hotel')
})

// import routes
const personRoutes = require('./routes/Person_routes')
const menuRoutes = require('./routes/MenuItems_routes')

app.use('/', personRoutes);
app.use('/', menuRoutes);


app.listen(PORT, () => {
    console.log("Backend server is runnnig seccessfully");
})