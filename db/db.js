const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let gfsBucket;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    gfsBucket = new GridFSBucket(conn.connection.db, { bucketName: 'uploads' });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const getGfsBucket = () => gfsBucket;

module.exports = { connectDB, getGfsBucket };
