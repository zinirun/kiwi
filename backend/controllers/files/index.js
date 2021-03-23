const { Router } = require('express');
const router = Router();

const models = require('../../models');

const ctrl = require('./files.ctrl');

router.post('/uploadS3', ctrl.s3_upload, async (req, res) => {
    const { files } = req;
    const { postId } = req.body;
    try {
        for await (const file of files) {
            const { location: fileUrl, mimetype: fileType, originalname: fileName, key } = file;
            console.log(file);
            models.file.create({
                postId,
                fileName,
                fileUrl,
                key,
                fileType: fileType.slice(0, 99),
            });
        }
        res.json({
            success: true,
            result: {
                id: postId,
                length: files.length,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
});

module.exports = router;
