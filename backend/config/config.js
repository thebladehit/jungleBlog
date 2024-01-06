const PORT = process.env.PORT ?? 3000;
const HOST = process.env.HOST ?? '127.0.0.1';
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const OPENAI_TOKEN = process.env.OPENAI_TOKEN;
const GPT_MODEL_TEXT = 'gpt-3.5-turbo';
const GPT_MODEL_IMAGE = 'dall-e-3';
const TIME_ZONE = 'Europe/Kiev';
const POSTING_STORY_TIME = 10;
const IMAGE_QUALITY = '1024x1024';
const CACHE_LIMIT_ITEMS = 40;

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
  CACHE_LIMIT_ITEMS
};