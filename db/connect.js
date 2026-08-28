const mongoose = require('mongoose');
const { config } = require('../config');

async function connectDb() {
    if (!config.mongoUri) {
        throw new Error('MONGO_URI is missing. Set it in your .env file.');
    }

    mongoose.set('strictQuery', true);
    await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB');
}

module.exports = { connectDb };