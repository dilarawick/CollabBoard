const mongoose = require('mongoose')
const { connectDb } = require('../db/connect')
const Board = require('../models/Board')
const Task = require('../models/Task')
const User = require('../models/User')

async function seedAll() {
  try {
    const connected = await connectDb()
    if (!connected) {
      console.error('Could not connect to MongoDB. Data was not seeded.')
      return
    }

    const users = await User.find({})
    const userMap = {}
    users.forEach((u) => {
      userMap[u.email] = u._id
    })

    const ownerId = userMap['dilarawickramanayake@gmail.com'] || users[0]._id
    const editorId = userMap['itsmeyenara@gmail.com'] || users[1]._id
    const viewerId = userMap['sasiniabey@gmail.com'] || users[2]._id

    await Board.deleteMany({})
    await Task.deleteMany({})

    const boards = await Board.insertMany([
      {
        name: 'Project Alpha',
        ownerId,
        members: [
          { userId: ownerId, role: 'owner' },
          { userId: editorId, role: 'editor' },
          { userId: viewerId, role: 'viewer' }
        ],
        columns: [
          { title: 'To Do', position: 0 },
          { title: 'In Progress', position: 1 },
          { title: 'Done', position: 2 }
        ]
      },
      {
        name: 'Project Beta',
        ownerId: editorId,
        members: [
          { userId: editorId, role: 'owner' },
          { userId: ownerId, role: 'editor' }
        ],
        columns: [
          { title: 'Backlog', position: 0 },
          { title: 'In Progress', position: 1 },
          { title: 'Done', position: 2 }
        ]
      }
    ])

    const board1 = boards[0]
    const board2 = boards[1]

    const tasks = await Task.insertMany([
      {
        boardId: board1._id,
        columnId: board1.columns[0]._id,
        title: 'Configure development environment',
        description: 'Set up the local development environment and project configuration',
        assigneeId: ownerId,
        assignee: 'Dilara Wickramanayake',
        status: 'In Progress',
        priority: 'medium',
        dueDate: new Date('2026-09-03'),
        position: 0
      },
      {
        boardId: board1._id,
        columnId: board1.columns[1]._id,
        title: 'Plan database structure',
        description: 'Design the database structure and define relationships between application data',
        assigneeId: editorId,
        assignee: 'Yenara Minsandhi',
        status: 'In Progress',
        priority: 'high',
        dueDate: new Date('2026-09-07'),
        position: 0
      },
      {
        boardId: board1._id,
        columnId: board1.columns[1]._id,
        title: 'Develop user authentication',
        description: 'Implement secure user authentication and session management',
        assigneeId: ownerId,
        assignee: 'Dilara Wickramanayake',
        status: 'In Progress',
        priority: 'high',
        dueDate: new Date('2026-09-12'),
        position: 1
      },
      {
        boardId: board1._id,
        columnId: board1.columns[2]._id,
        title: 'Prepare API documentation',
        description: 'Create clear documentation for available API endpoints and request formats',
        assigneeId: viewerId,
        assignee: 'Sasini Abeywickrama',
        status: 'Done',
        priority: 'medium',
        dueDate: new Date('2026-09-02'),
        position: 0
      },
      {
        boardId: board2._id,
        columnId: board2.columns[0]._id,
        title: 'Design application homepage',
        description: 'Create the layout and content structure for the main application homepage',
        assigneeId: users[3]._id,
        assignee: 'Udara Perera',
        status: 'To Do',
        priority: 'high',
        dueDate: new Date('2026-09-18'),
        position: 0
      },
      {
        boardId: board2._id,
        columnId: board2.columns[1]._id,
        title: 'Enable live task updates',
        description: 'Implement real-time synchronization for task changes across connected users',
        assigneeId: users[4]._id,
        assignee: 'Nadeera Ariyawansha',
        status: 'To Do',
        priority: 'medium',
        dueDate: new Date('2026-09-14'),
        position: 0
      }
    ])

    console.log(`Successfully seeded ${boards.length} boards and ${tasks.length} tasks`)
    await mongoose.connection.close()
    console.log('MongoDB connection closed')
  } catch (error) {
    console.error('Error seeding data:', error.message)
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close()
    }
  }
}

seedAll()
