const Courses = require('../models/coursesModel');


async function addCourses(req,res) {
    res.render('Courses/courses')
}

async function getAllCourses(req, res) {
    try {
        const display = await Courses.find().sort({_id: -1});
        res.render('Courses/display', { display });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function uploadCourse(req, res) {
    try {
        const courses = new Courses({
            title: req.body.title,
            image: {
                data: req.files['image'][0].buffer,
                contentType: req.files['image'][0].mimetype,
            },
            link: req.body.link,
            description: req.body.description,
            category: req.body.category,
            language: req.body.language,
            date: req.body.date,
        });

        await courses.save();
        console.log(courses);
        res.redirect('/courses/display');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteCourse(req, res) {
    try {
        const deletedCourses = await Courses.findByIdAndDelete(req.params.id);

        if (!deletedCourses) {
            return res.status(404).send('Course not found');
        }

        res.redirect('/courses/display');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function editCourse(req, res) {
    try {
        const course = await Courses.findById(req.params.id);

        if (!course) {
            return res.status(404).send('Course not found');
        }

        res.render('Courses/editC', { course });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function updateCourse(req, res) {
    try {
        const updatedCourses = await Courses.findById(req.params.id);

        if (!updatedCourses) {
            return res.status(404).send('Course not found');
        }

        updatedCourses.title = req.body.title;
        
        if (req.files['image'] && req.files['image'][0]) {
            updatedCourses.image = {
                data: req.files['image'][0].buffer,
                contentType: req.files['image'][0].mimetype,
            };
        }
        
        updatedCourses.link = req.body.link;
        updatedCourses.description = req.body.description;
        updatedCourses.category = req.body.category;
        updatedCourses.language = req.body.language;
        updatedCourses.date = req.body.date;

        await updatedCourses.save();
        res.redirect('/courses/display');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    addCourses,
    getAllCourses,
    uploadCourse,
    deleteCourse,
    editCourse,
    updateCourse,
};
