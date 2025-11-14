const express = require('express')
const router = express.Router()

const MenueItems = require('../models/MenueItems')

//route 1: Add MenueItems data
router.post('/addItems', async (req, res) => {
    try {
        const data = req.body
        const NewMenueItems = MenueItems(data)

        const saveMenueItems = await NewMenueItems.save()
        console.log("MenueItems data Saved");
        res.status(200).json(saveMenueItems)
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Internal server Error' })
    }
})

// route 2: fetch all menuIntems
router.get('/fetchAllItems', async (req, res) => {
    try {
        const allMenuItems = await MenueItems.find();
        console.log("fetch all menu items");
        res.status(201).json(allMenuItems)
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Internal server Error' })
    }
})

// route 3: fetch items is veg / Non-veg
router.get('/Items/:type', async (req, res) => {
    try {
        const type = req.params.type;
        const response = await MenueItems.find({ type: type })
        if (type == "Veg" || type == 'Non-Veg') {
            res.status(201).json(response)
        } else {
            res.status(404).json('Invalid type')
        }
    } catch (error) {
        console.log("Internal server error");
        res.status(500).json({ error: 'Internal server error' })
    }
})

// routes 4: Update MenuItems data
router.put('/itemsUpdate/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updateMenu = req.body;

        const response = await MenueItems.findByIdAndUpdate(menuId, updateMenu, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        console.log("Menu item updated successfully");
        res.status(200).json(response);
    } catch (error) {
        console.error("Error updating menu item:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// routes 5: Delete MenuItems
router.delete('/itemsDelete/:id', async (req, res) => {
    try {
        const menueItemsId = req.params.id;

        const response = await MenueItems.findByIdAndDelete(menueItemsId)

        if (!response) {
            return res.status(404).json("MenuItems is note Found");
        }

        console.log("Delete menuitems data");
        res.status(200).json({ message: 'menuitems Deleted Successfully' })
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router;