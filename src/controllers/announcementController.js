const Announcement = require("../models/Announcement");


exports.createAnnouncement = async (req, res) => {
    try {
        const announcement = req.body;
        const newannouncement  = new Announcement(announcement);
        const result = await newannouncement.save();
   
        res.status(200).json(result);
    } catch (error) {
        console.error('Error  post announcement data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllAnnouncements = async(req, res) => {
    try{
       const result = await Announcement.find();
       res.send(result);

    } catch (error) {
        console.error('Error getting announcement data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
