const express = require('express');
const { createAnnouncement, getAllAnnouncements } = require('../controllers/announcementController');

const router = express.Router();

router.post('/announcements', createAnnouncement);
router.get('/announcements', getAllAnnouncements);

module.exports = router;