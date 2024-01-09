const express = require('express');
const multer = require('multer');
const resourcesController = require('../controllers/resourcesController')
//const Resources = require('../models/resourcesModel')

const router = express.Router();

router.use(express.static('public'));
router.use(express.urlencoded({ extended: false }));


const storage = multer.memoryStorage()

const upload = multer({storage: storage})

router.get('', resourcesController.addResources);

router.post('/upload', upload.fields([{ name: 'file', maxCount: 1 }]), resourcesController.uploadResources);

router.get('/images', resourcesController.getAllResources);

router.get('/download/file/:id', resourcesController.downloadResources);

router.post('/delete/:id', resourcesController.deleteResources);

router.get('/edit/:id', resourcesController.editResources);

router.post('/edit/:id',  upload.fields([{ name: 'file', maxCount: 1 }]), resourcesController.updateResources);

module.exports = router;

// router.get('',(req,res) => {
//     res.render('Resources/index')
// })

// router.post('/upload', upload.fields([ { name: 'file', maxCount: 1 }]), async (req, res) => {
//     try {
//         const resource = new Resources({
//             title: req.body.title,
//             file: {
//                 data: req.files['file'][0].buffer,
//                 contentType: req.files['file'][0].mimetype,
//             },
//             description: req.body.description,
//             category: req.body.category,
//             date: req.body.date,
//         });

//         await resource.save();
//         console.log(resource)
//         res.redirect('/resources/images');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });


// router.get('/images', async (req,res) => {
//     const images = await Resources.find().sort({_id:-1});

//     res.render('Resources/images', { images: images})
// });


// router.get('/download/file/:id', async (req, res) => {
//     try {
//         const resource = await Resources.findById(req.params.id);

//         if (!resource) {
//             return res.status(404).send('Resource not found');
//         }

//         if (resource.file && resource.file.data) {
//             const buffer = Buffer.from(resource.file.data, 'base64');

//             res.set({
//                 'Content-Type': 'application/pdf',
//                 'Content-Disposition': `attachment; filename=${resource.title}_file.pdf`,
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
//         const deletedResource = await Resources.findByIdAndDelete(req.params.id);

//         if (!deletedResource) {
//             return res.status(404).send('Resource not found');
//         }

//         res.redirect('/resources/images');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });



// router.get('/edit/:id', async (req, res) => {
//     try {
//         const resource = await Resources.findById(req.params.id);

//         if (!resource) {
//             return res.status(404).send('Resource not found');
//         }

//         res.render('Resources/edit', { resource });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// router.post('/edit/:id', upload.fields([ { name: 'file', maxCount: 1 }]), async (req, res) => {
//     try {
//         const updatedResource = await Resources.findById(req.params.id);

//         if (!updatedResource) {
//             return res.status(404).send('Resource not found');
//         }

//         updatedResource.title = req.body.title;
//         updatedResource.description = req.body.description;
//         updatedResource.category = req.body.category;
//         updatedResource.date = req.body.date;

    
        
//         if (req.files['file'] && req.files['file'][0]) {
//             updatedResource.file = {
//                 data: req.files['file'][0].buffer,
//                 contentType: req.files['file'][0].mimetype,
//             };
//         }

//         await updatedResource.save();
//         res.redirect('/resources/images');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// module.exports = router;