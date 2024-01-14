const PORT = process.env.PORT ?? 3000;
const HOST = process.env.HOST ?? '127.0.0.1';
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const OPENAI_TOKEN = process.env.OPENAI_TOKEN;
const GPT_MODEL_TEXT = process.env.GPT_MODEL_TEXT;
const GPT_MODEL_IMAGE = process.env.GPT_MODEL_IMAGE;
const TIME_ZONE = process.env.TIME_ZONE;
const POSTING_STORY_TIME = process.env.POSTING_STORY_TIME;
const IMAGE_QUALITY = process.env.IMAGE_QUALITY;
const CACHE_LIMIT_ITEMS = process.env.CACHE_LIMIT_ITEMS;
const RENEW_TOKEN_TIME = process.RENEW_TOKEN_TIME;
const ADMIN_LOGIN = process.env.ADMIN_LOGIN;
const ADMIN_PASS = process.env.ADMIN_PASS;

module.exports = { 
  PORT,
  HOST, 
  DB_PORT, 
  DB_NAME, 
  DB_USER, 
  DB_PASSWORD, 
  OPENAI_TOKEN,
  GPT_MODEL_TEXT,
  GPT_MODEL_IMAGE,
  TIME_ZONE,
  POSTING_STORY_TIME,
  IMAGE_QUALITY,
  CACHE_LIMIT_ITEMS,
  RENEW_TOKEN_TIME,
  ADMIN_LOGIN,
  ADMIN_PASS
};