const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { connectDb } = require('../db/connect')
const User = require('../models/User')

const demoUsers = [
  { name: 'Dilara Wickramanayake', email: 'dilarawickramanayake@gmail.com', password: 'password123' },
  { name: 'Yenara Minsandhi', email: 'itsmeyenara@gmail.com', password: 'password123' },
  { name: 'Sasini Abeywickrama', email: 'sasiniabey@gmail.com', password: 'password123' },
  { name: 'Udara Perera', email: 'ttyler002@gmail.com', password: 'password123' },
  { name: 'Nadeera Ariyawansha', email: 'nadeeraariyawansha43@gmail.com', password: 'password123' }
]

async function seedUsers() {
  try {
    const connected = await connectDb()
    if (!connected) {
      console.error('Could not connect to MongoDB. Users were not seeded.')
      return
    }

    await User.deleteMany({})

    const usersToInsert = demoUsers.map((user) => ({
      name: user.name,
      email: user.email,
      passwordHash: bcrypt.hashSync(user.password, 10)
    }))

    const inserted = await User.insertMany(usersToInsert)
    console.log(`Successfully seeded ${inserted.length} users`)
    console.log('Demo credentials:')
    demoUsers.forEach((u) => {
      console.log(`  ${u.email} / ${u.password}`)
    })

    await mongoose.connection.close()
    console.log('MongoDB connection closed')
  } catch (error) {
    console.error('Error seeding users:', error.message)
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close()
    }
  }
}

seedUsers()
