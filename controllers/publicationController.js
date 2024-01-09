const Publications = require('../models/resourcesModel');

async function addPublications(req,res) {
    res.render('Publications/publications')
}

async function getAllPublications(req, res) {
    try {
        const display = await Publications.find().sort({_id: -1});
        res.render('Publications/display', { display });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function uploadPublications(req, res) {
    try {
        const publication = new Publications({
            title: req.body.title,
            file: {
                data: req.files['file'][0].buffer,
                contentType: req.files['file'][0].mimetype,
            },
            description: req.body.description,
            category: req.body.category,
            dateUploaded: Date.now()
        });

        await publication.save();
        console.log(publication)
        res.redirect('/publications/display');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function downloadPublications(req,res) {
    try {
        const publication = await Publications.findById(req.params.id);

        if (!publication) {
            return res.status(404).send('Publication not found');
        }

        if (publication.file && publication.file.data) {
            const buffer = Buffer.from(publication.file.data, 'base64');

            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${publication.title}_file.pdf`,
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

async function deletePublications(req, res) {
    try {
        const deletedPublication = await Publications.findByIdAndDelete(req.params.id);

        if (!deletedPublication) {
            return res.status(404).send('Punlications not found');
        }

        res.redirect('/publications/display');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function editPublications(req, res) {
    try {
        const publication = await Publications.findById(req.params.id);

        if (!publication) {
            return res.status(404).send('Publication not found');
        }

        res.render('Publications/edit', { publication });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function updatePublications(req, res) {
    try {
        const updatedPublication = await Publications.findById(req.params.id);

        if (!updatedPublication) {
            return res.status(404).send('Resource not found');
        }

        updatedPublication.title = req.body.title;
        updatedPublication.description = req.body.description;
        updatedPublication.category = req.body.category;
        
        if (req.files['file'] && req.files['file'][0]) {
            updatedPublication.file = {
                data: req.files['file'][0].buffer,
                contentType: req.files['file'][0].mimetype,
            };
        }

        await updatedPublication.save();
        res.redirect('/publications/display');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    addPublications,
    getAllPublications,
    uploadPublications,
    downloadPublications,
    deletePublications,
    editPublications,
    updatePublications,
};
