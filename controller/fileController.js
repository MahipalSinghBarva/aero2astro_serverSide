const express = require('express');
const { Readable } = require('stream');
const multer = require('multer');
const mongoose = require('mongoose');
const { getGfsBucket } = require('../db/db.js');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const gfsBucket = getGfsBucket();
    if (!gfsBucket) return res.status(500).json({ error: 'GridFSBucket not initialized' });

    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    const uploadStream = gfsBucket.openUploadStream(req.file.originalname);
    readableStream.pipe(uploadStream);

    uploadStream.on('finish', () => res.json({ fileId: uploadStream.id }));
    uploadStream.on('error', (err) => res.status(500).json({ error: 'Upload failed', details: err.message }));
  } catch (error) {
    res.status(500).json({ error: 'Error processing file upload', details: error.message });
  }
});


router.get('/las/:fileId', async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);
    const gfsBucket = getGfsBucket();
    if (!gfsBucket) return res.status(500).json({ error: 'GridFSBucket not initialized' });

    const downloadStream = gfsBucket.openDownloadStream(fileId);
    downloadStream.pipe(res);

    downloadStream.on('error', (err) => res.status(404).json({ error: 'File not found', details: err.message }));
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving file', details: error.message });
  }
});

module.exports = router;
