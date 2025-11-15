const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')
const { jwnAuthMiddleware, generateToken } = require('../authentication/jwt')

const Person = require('../models/Person')

// route 1: (Add/ sign in) the emp data
router.post('/signup', async (req, res) => {
    try {
        const data = req.body // Assunming the request body contains the person data
        const newPerson = Person(data)// Create a new Person document using the mongoose model

        // Save the new person to database
        const response = await newPerson.save();
        console.log('Person Data Saved');

        // create payload
        const payLoad = {
            id: response._id,
            username: response.username,
            name: response.name
        }
        // user jtw token
        const token = generateToken(payLoad);
        console.log("token: ", token);

        res.status(200).json({ response: response, token: token })
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ error: 'Inernal server error' })
    }
})

// routes : login the employee
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await Person.findOne({ username: username })

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'invalid username and password ' })
        }
        const payLoad = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payLoad)

        res.status(200).json({
            message: 'user logged in seccessfully',
            id: user.id,
            username: username,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Servre Error' })
    }
})

// route 2: fetch all person data
router.get('/allFetch', jwnAuthMiddleware, async (req, res) => {
    try {
        const allPerson = await Person.find()
        console.log("Fetch All Person successfull");
        res.status(200).json(allPerson)
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Internal server Error' })
    }
})

// route Get : user check self profile
router.get('/profile', jwnAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user

        const userId = userData.id

        const user = await Person.findById(userId)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// route 3 : fetch perameterized person api call
router.get('/fetch/:workType', async (req, res) => {
    try {
        const workType = req.params.workType
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({ work: workType });
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'invalid work type' })
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Internal server Error' })
    }
})

// routes 4 pesron data update
router.put('/update/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL prameter
        const updatePersonData = req.body; // updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person is note found' })
        }
        console.log("Update Person data");
        res.status(200).json(response)

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Internal server Error' })
    }
})

// route 5: Delete Person Data
router.delete('/deletePerson/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId)

        if (!response) {
            return res.status(404).json({ error: 'Person is note found' })
        }

        console.log("Delete Person data");
        res.status(200).json({ message: 'Pesron Deleted Successfully' })
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Internal server Error' })
    }
})

module.exports = router;