const express = require('express');
const router = express.Router();
const { User, Show } = require("../../models");


// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// GET a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// POST create a new user
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await User.create({ name, email });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});
// GET all shows one user watched
router.get('/:id/shows', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: {
                model: Show,
                as: 'watchedShows'
            }
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.watchedShows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch shows' });
    }
});

// put  a user with a show they have watched

router.put('/:userId/shows/:showId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        const show = await Show.findByPk(req.params.showId);

        if (!user || !show) return res.status(404).json({ error: 'User or Show not found' });

        // Associate the user with the show
        await user.addWatchedShows(show);
        res.status(200).json({ message: 'User associated with show successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to associate user with show' });
    }
});
module.exports = router;