const express = require('express');
const router = express.Router();
const { User, Show } = require("../../models");

// GET all shows
router.get("/", async (req, res) => {
    try {
        const shows = await Show.findAll();
        res.json(shows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch shows' });
    }
});

// GET a show by ID
router.get("/:id", async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id);
        if (!show) return res.status(404).json({ error: 'Show not found' });
        res.json(show);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch show' });
    }
});
//find all users that havbe watch a show 
router.get("/:id/users", async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id, {
            include: {
                model: User,
                as: 'watchedByUsers'
            }
        });
        if (!show) return res.status(404).json({ error: 'Show not found' });
        res.json(show.watchedByUsers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// PUT update the availability of a show
router.put("/:id/available", async (req, res) => {
    try {
        const { available } = req.body;
        const show = await Show.findByPk(req.params.id);
        if (!show) return res.status(404).json({ error: 'Show not found' });

        show.available = available;
        await show.save();
        res.json(show);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update show availability' });
    }
});
// DELETE a show
router.delete("/:id", async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id);
        if (!show) return res.status(404).json({ error: 'Show not found' });

        await show.destroy();
        res.status(200).json({ message: 'Show deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete show' });
    }
});

// GET shows by genre
router.get("/genre/:genre", async (req, res) => {
    try {
        const shows = await Show.findAll({
            where: { genre: req.params.genre }
        });
        if (!shows) return res.status(404).json({ error: 'No shows found for this genre' });
        res.json(shows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch shows by genre' });
    }
});

module.exports = router;