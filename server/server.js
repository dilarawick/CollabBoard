const express = require('express')
const cors = require('cors')
const { config } = require('./config')
const { connectDb } = require('./db/connect')
const tasksRouter = require('./routes/tasks')
const authRouter = require('./routes/auth')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/tasks', tasksRouter)
app.use('/api/auth', authRouter)

app.get('/health', (_req, res) => {
	res.status(200).json({ status: 'ok' })
})

async function startServer() {
    const connected = await connectDb()

    app.listen(config.port, () => {
        console.log(`Server running on http://localhost:${config.port}`)
        if (!connected) {
            console.log('Using in-memory mock data (no MongoDB connection)')
        }
    })
}

startServer()