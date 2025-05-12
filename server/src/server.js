const app = require('./app');
require('dotenv').config();

const { connectDb } = require('../db');

connectDb();

PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});