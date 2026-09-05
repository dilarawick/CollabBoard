const mongoose = require('mongoose');

const { connectDb } = require('./db/connect');
const Task = require('./models/Task');
const tasks = require('./mockdata/tasks');

async function seedTasks() {
  try {
    const connected = await connectDb();

    if (!connected) {
      console.error('Could not connect to MongoDB. Tasks were not seeded.');
      return;
    }

    await Task.deleteMany({});

    const insertedTasks = await Task.insertMany(tasks);

    console.log(`Successfully seeded ${insertedTasks.length} tasks`);

    await mongoose.connection.close();

    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error seeding tasks:', error.message);

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
}

seedTasks();