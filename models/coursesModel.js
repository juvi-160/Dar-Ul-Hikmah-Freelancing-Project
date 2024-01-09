const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        data: {
            type: Buffer,
            required: true,
        },
        contentType: {
            type: String,
            required: true,
        },
    },
    link: {
        type: String,
        required: true, 
    },
    description: String,
    category: {
        type: String,
        enum: ['Women', 'Children'],
        required: true,  
    },
    language: {
        type: String,
        default: 'English',
        enum: ['English', 'Urdu'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Courses = mongoose.model('Courses', coursesSchema);

module.exports = Courses;
