const express = require('express');
const router = express.Router();
const { User, Show } = require("../../models");

// GET all shows
router.get('/', async (req, res) => {
    try {
        const shows = await Show.findAll();
        res.json(shows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch shows' });
    }
});

// GET a show by ID
router.get('/:id', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id);
        if (!show) return res.status(404).json({ error: 'Show not found' });
        res.json(show);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch show' });
    }
});

// POST create a new show
router.post('/', async (req, res) => {
    try {
        const { title, genre, available } = req.body;
        const newShow = await Show.create({ title, genre, available });
        res.status(201).json(newShow);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create show' });
    }
});


module.exports = router;