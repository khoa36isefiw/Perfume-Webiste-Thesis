require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected!'));

mongoose.connection.on('error', (err) => {
    console.log(err);
    process.exit(1);
});
