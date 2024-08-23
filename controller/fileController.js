const express = require('express');
const { Readable } = require('stream');
const multer = require('multer');
const mongoose = require('mongoose');
const { getGfsBucket } = require('../db/db.js');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), (req, res) => {
  const readableStream = new Readable();
  readableStream.push(req.file.buffer);
  readableStream.push(null);

  const gfsBucket = getGfsBucket();
  const uploadStream = gfsBucket.openUploadStream(req.file.originalname);
  readableStream.pipe(uploadStream);

  uploadStream.on('finish', () => res.json({ fileId: uploadStream.id }));
  uploadStream.on('error', (err) => res.status(500).send(err));
});


router.get('/las/:fileId', (req, res) => {
  const fileId = new mongoose.Types.ObjectId(req.params.fileId);
  const gfsBucket = getGfsBucket();
  gfsBucket.openDownloadStream(fileId).pipe(res);
});

module.exports = router;
