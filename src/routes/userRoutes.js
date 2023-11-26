const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/users',userController.createUser);

// Add other user-related routes

module.exports = router;
