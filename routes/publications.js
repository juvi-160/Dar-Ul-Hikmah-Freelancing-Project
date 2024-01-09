const express = require('express');
const multer = require('multer');
const publicationsController = require('../controllers/publicationController')
//const Publications = require('../models/resourcesModel')

const router = express.Router();

router.use(express.static('public'));
router.use(express.urlencoded({ extended: false }));


const storage = multer.memoryStorage()

const upload = multer({storage: storage})

router.get('', publicationsController.addPublications);

router.post('/upload', upload.fields([{ name: 'file', maxCount: 1 }]), publicationsController.uploadPublications);

router.get('/display', publicationsController.getAllPublications);

router.get('/download/file/:id', publicationsController.downloadPublications);

router.post('/delete/:id', publicationsController.deletePublications);

router.get('/edit/:id', publicationsController.editPublications);

router.post('/edit/:id',  upload.fields([{ name: 'file', maxCount: 1 }]), publicationsController.updatePublications);

module.exports = router;


// router.get('',(req,res) => {
//     res.render('Publications/publications')
// })

// router.post('/upload', upload.fields([{ name: 'file', maxCount: 1 }]), async (req, res) => {
//     try {
//         const publication = new Publications({
//             title: req.body.title,
//             name: req.body.name,
//             file: {
//                 data: req.files['file'][0].buffer,
//                 contentType: req.files['file'][0].mimetype,
//             },
//             description: req.body.description,
//             category: req.body.category,
//         });

//         await publication.save();
//         console.log(publication)
//         res.redirect('/publications/display');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });


// router.get('/display', async (req,res) => {
//     const display = await Publications.find().sort({_id:-1});

//     res.render('Publications/display', { display: display})
// });


// router.get('/download/file/:id', async (req, res) => {
//     try {
//         const publication = await Publications.findById(req.params.id);

//         if (!publication) {
//             return res.status(404).send('Publication not found');
//         }

//         if (publication.file && publication.file.data) {
//             const buffer = Buffer.from(publication.file.data, 'base64');

//             res.set({
//                 'Content-Type': 'application/pdf',
//                 'Content-Disposition': `attachment; filename=${publication.name}_file.pdf`,
//             });

//             res.send(buffer);
//         } else {
//             res.status(404).send('No file available for download');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });




// router.post('/delete/:id', async (req, res) => {
//     try {
//         const deletedPublication = await Publications.findByIdAndDelete(req.params.id);

//         if (!deletedPublication) {
//             return res.status(404).send('uploadPublicationss not found');
//         }

//         res.redirect('/resources/display');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });



// router.get('/edit/:id', async (req, res) => {
//     try {
//         const publication = await Publications.findById(req.params.id);

//         if (!publication) {
//             return res.status(404).send('Publication not found');
//         }

//         res.render('Publications/edit', { publication });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// router.post('/edit/:id', upload.fields([{ name: 'file', maxCount: 1 }]), async (req, res) => {
//     try {
//         const updatedPublication = await Publications.findById(req.params.id);

//         if (!updatedPublication) {
//             return res.status(404).send('Resource not found');
//         }

//         updatedPublication.title = req.body.title;
//         updatedPublication.description = req.body.description;
//         updatedPublication.category = req.body.category;
        
//         if (req.files['file'] && req.files['file'][0]) {
//             updatedPublication.file = {
//                 data: req.files['file'][0].buffer,
//                 contentType: req.files['file'][0].mimetype,
//             };
//         }

//         await updatedPublication.save();
//         res.redirect('/publications/display');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// module.exports = router;