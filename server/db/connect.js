const mongoose = require('mongoose');
const { config } = require('../config');

async function connectDb() {
    if (!config.mongoUri) {
        console.warn('MONGO_URI is missing. Skipping MongoDB connection. Running with in-memory mock data.')
        return false
    }

    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 5000 })
        console.log('Connected to MongoDB')
        return true
    } catch (error) {
        console.warn('Failed to connect to MongoDB:', error.message)
        console.warn('Running with in-memory mock data instead.')
        return false
    }
}

module.exports = { connectDb };