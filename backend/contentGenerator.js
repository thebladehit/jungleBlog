'use strict';

require('dotenv').config();
const { writeFile } = require('./fs/fs.js');
const OpenAI = require('openai');
const { OPENAI_TOKEN, GPT_MODEL_TEXT, GPT_MODEL_IMAGE, TIME_ZONE, POSTING_STORY_TIME, IMAGE_QUALITY } = require('./config/config.js');
const storiesTheme = require('./data/thmesForStories.json');
const themeIndexObj = require('./data/nextThemeIndex.json');
const { pool } = require('./db/pool.js');
const { requestBenchMark, convertFromB64toBuffer } = require('./gpt-api/toolsesForApi.js');
const { generateText, genetateImage } = require('./gpt-api/gptApi.js');

const openai = new OpenAI({
  apiKey: OPENAI_TOKEN
});

const getMilisecondsToHour = (hour, timeZone) => {
  const targettTime = new Date();
  targettTime.setDate(targettTime.getDate() + 1);
  targettTime.setHours(hour, 0, 0, 0);
  targettTime.toLocaleString({ timeZone });
  return targettTime.getTime() - Date.now();
};

const generateStory = async () => {
  const themeIndex = themeIndexObj.themeIndex++;
  const theme = storiesTheme[themeIndex];
  const messages = [
    { 'role': 'system', 'content': 'Write a first-person narrative as a part of notes entry for [Day_id] of surviving on a deserted island. Describe [desc], detailing the personal experiences, challenges faced, and survival strategies used' },
    { 'role': 'user', 'content': `Write a first-person narrative as a diary entry for ${theme.title} of surviving on a deserted island. Describe ${theme.content}, detailing the personal experiences, challenges faced, and survival strategies used` }
  ];
  const params = [openai, GPT_MODEL_TEXT, messages];
  const text = await generateText(...params);
  const imageB64 = await genetateImage(openai, GPT_MODEL_IMAGE, theme.imagePrompt, 1, IMAGE_QUALITY);
  const imageBuffer = convertFromB64toBuffer(imageB64['b64_json']);
  await writeFile(`./static/res/themeImg/${themeIndex + 1}.jpg`, imageBuffer);
  await writeFile('./data/nextThemeIndex.json', JSON.stringify(themeIndexObj));
  const imageUrl = `res/themeImg/${themeIndex + 1}.jpg`;
  const client = await pool.connect();
  const query = 'INSERT INTO jungleBlog.stories(title, content, image_url) VALUES ($1, $2, $3)';
  await client.query(query, [theme.title, text, imageUrl]);
  client.release();
};

const startGenerateContent = () => {
  const milisecondsToStart = getMilisecondsToHour(POSTING_STORY_TIME, TIME_ZONE);
  setTimeout(() => {
    generateStory();
    setInterval(generateStory, 1000 * 60 * 60 * 24);
  }, milisecondsToStart);
};

module.exports = { startGenerateContent };