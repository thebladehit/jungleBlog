const PORT = process.env.PORT ?? 3000;
const HOST = process.env.HOST ?? '127.0.0.1';
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = { PORT, HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD };