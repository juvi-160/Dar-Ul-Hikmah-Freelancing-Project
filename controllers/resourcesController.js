const Resources = require('../models/resourcesModel');

async function addResources(req,res) {
    res.render('Resources/index')
}

async function uploadResources(req,res) {
    try {
        const resource = new Resources({
            title: req.body.title,
            file: {
                data: req.files['file'][0].buffer,
                contentType: req.files['file'][0].mimetype,
            },
            description: req.body.description,
            category: req.body.category,
            date: req.body.date,
        });

        await resource.save();
        console.log(resource)
        res.redirect('/resources/images');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function getAllResources(req,res) {
    try {
        const images = await Resources.find().sort({_id: -1});
        res.render('Resources/images', { images });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function downloadResources(req,res) {
    try {
        const resource = await Resources.findById(req.params.id);

        if (!resource) {
            return res.status(404).send('Resource not found');
        }

        if (resource.file && resource.file.data) {
            const buffer = Buffer.from(resource.file.data, 'base64');

            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${resource.title}_file.pdf`,
            });

            res.send(buffer);
        } else {
            res.status(404).send('No file available for download');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteResources(req,res) {
    try {
        const deletedResource = await Resources.findByIdAndDelete(req.params.id);

        if (!deletedResource) {
            return res.status(404).send('Resource not found');
        }

        res.redirect('/resources/images');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function editResources(req,res) {
    try {
        const resource = await Resources.findById(req.params.id);

        if (!resource) {
            return res.status(404).send('Resource not found');
        }

        res.render('Resources/edit', { resource });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function updateResources(req,res){
    try {
        const updatedResource = await Resources.findById(req.params.id);

        if (!updatedResource) {
            return res.status(404).send('Resource not found');
        }

        updatedResource.title = req.body.title;
        updatedResource.description = req.body.description;
        updatedResource.category = req.body.category;
        updatedResource.date = req.body.date;

    
        
        if (req.files['file'] && req.files['file'][0]) {
            updatedResource.file = {
                data: req.files['file'][0].buffer,
                contentType: req.files['file'][0].mimetype,
            };
        }

        await updatedResource.save();
        res.redirect('/resources/images');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    addResources,
    getAllResources,
    uploadResources,
    downloadResources,
    deleteResources,
    editResources,
    updateResources,
};