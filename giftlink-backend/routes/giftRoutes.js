const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Task: Implement the /api/gifts endpoint to retrieve all gifts
router.get('/api/gifts', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();

        // Task 2: Use the collection() method to retrieve the gift collection
        const collection = db.collection('gifts');

        // Task 3: Fetch all gifts using the collection.find method. Chain with toArray method to convert to JSON array
        const gifts = await collection.find({}).toArray();

        // Task 4: Return the gifts using the res.json method
        res.json(gifts);
    } catch (error) {
        console.error('Error fetching gifts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Task: Implement the /api/gifts/:id endpoint to retrieve a specific gift by ID
router.get('/api/gifts/:id', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();

        // Task 2: Use the collection() method to retrieve the gift collection
        const collection = db.collection('gifts');

        // Task 3: Find a specific gift by ID using the collection.findOne method and store in constant called gift
        const gift = await collection.findOne({ id: req.params.id });

        // Return the gift or a 404 if not found
        if (!gift) {
            return res.status(404).json({ error: 'Gift not found' });
        }
        res.json(gift);
    } catch (error) {
        console.error('Error fetching gift by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;