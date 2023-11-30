const { Schema, model} = require('mongoose');

const AnnouncementsSchema = new Schema({
    authorName: {
        type: String,
        required: true
    },
    authorImage:{
        type: String,
    },
    title: {
        type: String
    }, 
    description: {
       type: String
    }
    
});

const Announcement = model('Announcement', AnnouncementsSchema);

module.exports = Announcement;

