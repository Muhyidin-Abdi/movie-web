const express = require('express');
const router = express.Router();
const userRoutes = require("./usersRouter");
const showRoutes = require("./showRouters");


router.use('/users', userRoutes);  
router.use('/shows', showRoutes);  

module.exports = router;