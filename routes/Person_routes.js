const express = require('express');
const router = express.Router()

const Person = require('../models/Person')

// route 1: Add the emp data
router.post('/addPerson', async (req, res) => {
    try {
        const data = req.body // Assunming the request body contains the person data
        const newPerson = Person(data)// Create a new Person document using the mongoose model

        // Save the new person to database
        const response = await newPerson.save();
        console.log('Person Data Saved');
        res.status(200).json(response)
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ error: 'Inernal server error' })
    }
})

// route 2: fetch all person data
router.get('/allFetch', async (req, res) => {
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