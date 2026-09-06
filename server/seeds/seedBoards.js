const mongoose = require('mongoose');
const { connectDb } = require('../db/connect');
const Board = require('../models/Board');

const dummyBoards = [
  {
    name: 'Project Alpha',
    ownerId: '64f1a2b3c4d5e6f7a8b9c0d1',
    members: [
      { userId: '64f1a2b3c4d5e6f7a8b9c0d1', role: 'owner' },
      { userId: '64f1a2b3c4d5e6f7a8b9c0d2', role: 'editor' }
    ],
    columns: [
      { title: 'To Do', position: 0 },
      { title: 'In Progress', position: 1 },
      { title: 'Done', position: 2 }
    ]
  },
  {
    name: 'Marketing Board',
    ownerId: '64f1a2b3c4d5e6f7a8b9c0d2',
    members: [
      { userId: '64f1a2b3c4d5e6f7a8b9c0d2', role: 'owner' }
    ],
    columns: [
      { title: 'Backlog', position: 0 },
      { title: 'Done', position: 1 }
    ]
  }
];

async function seedBoards() {
  await connectDb();
  await Board.deleteMany({});
  await Board.insertMany(dummyBoards);
  console.log('Boards seeded successfully');
  await mongoose.connection.close();
}

seedBoards();