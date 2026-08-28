const dns = require('dns');
const dotenv = require('dotenv');

dns.setServers(['8.8.8.8', '1.0.0.1', '8.8.4.4']);

dotenv.config();

const config = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI || ''
};

module.exports = { config };
