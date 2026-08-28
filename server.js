const express = require('express');
const cors = require('cors');
const { config } = require('./config');
const { connectDb } = require('./db/connect');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
	res.status(200).json({ status: 'ok' });
});

async function startServer() {
	try {
		await connectDb();

		app.listen(config.port, () => {
			console.log(`Server running on http://localhost:${config.port}`);
		});
	} catch (error) {
		console.error('Failed to start server:', error.message);
		process.exit(1);
	}
}

startServer();