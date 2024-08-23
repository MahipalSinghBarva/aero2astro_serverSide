const { connectDB } = require('./db/db.js');
const express = require('express');
const cors = require('cors');

const fileRoutes = require('./controller/fileController.js');

const app = express();
app.use(cors());
app.use('/api', fileRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
  });
});

app.get('/', (req, res) => {
  res.status(200).send({

    message: "API Running Successfully...!",
    status: true,
    data: [],
  });
});