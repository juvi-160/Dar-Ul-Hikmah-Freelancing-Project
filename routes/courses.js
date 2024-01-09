const express = require('express');
const multer = require('multer');
const coursesController = require('../controllers/coursesContoller');

const router = express.Router();

router.use(express.static('public'));
router.use(express.urlencoded({ extended: false }));

const storage = multer.memoryStorage()

const upload = multer({storage: storage})

router.get('', coursesController.addCourses);

router.post('/upload',upload.fields([{ name: 'image', maxCount: 1 }]), coursesController.uploadCourse);

router.get('/display',  coursesController.getAllCourses);

router.post('/delete/:id', coursesController.deleteCourse);

router.get('/edit/:id', coursesController.editCourse);

router.post('/edit/:id', upload.fields([{ name: 'image', maxCount: 1 }]), coursesController.updateCourse);

module.exports = router;

// router.get('',(req,res) => {
//     res.render('Courses/courses')
// })

// router.post('/upload', async (req, res) => {
//     try {
//         const courses = new Courses({
//             title: req.body.title,
//             link: req.body.link,
//             description: req.body.description,
//             category: req.body.category,
//             language: req.body.language,
//             date: req.body.date,
//         });

//         await courses.save();
//         console.log(courses)
//         res.redirect('/courses/display');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });


// router.get('/display', async (req,res) => {
//     const display = await Courses.find().sort({_id:-1});

//     res.render('Courses/display', { display: display})
// });


// router.post('/delete/:id', async (req, res) => {
//     try {
//         const deletedCourses = await Courses.findByIdAndDelete(req.params.id);

//         if (!deletedCourses) {
//             return res.status(404).send('Course not found');
//         }

//         res.redirect('/courses/display');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });



// router.get('/edit/:id', async (req, res) => {
//     try {
//         const course = await Courses.findById(req.params.id);

//         if (!course) {
//             return res.status(404).send('Course not found');
//         }

//         res.render('Courses/editC', { course });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// router.post('/edit/:id', async (req, res) => {
//     try {
//         const updatedCourses = await Courses.findById(req.params.id);

//         if (!updatedCourses) {
//             return res.status(404).send('Course not found');
//         }

//         updatedCourses.title = req.body.title;
//         updatedCourses.link = req.body.link;
//         updatedCourses.description = req.body.description;
//         updatedCourses.category = req.body.category;
//         updatedCourses.language = req.body.language
//         updatedCourses.date = req.body.date;

    
//         await updatedCourses.save();
//         res.redirect('/courses/display');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// module.exports = router;