'use strict';

require('dotenv').config();
const path = require('node:path');
const { writeFile } = require('./fs/fs.js');
const OpenAI = require('openai');
const { OPENAI_TOKEN, GPT_MODEL_TEXT, GPT_MODEL_IMAGE, TIME_ZONE, POSTING_STORY_TIME, IMAGE_QUALITY } = require('./config/config.js');
const storiesTheme = require('./data/thmesForStories.json');
const themeIndexObj = require('./data/nextThemeIndex.json');
const { pool } = require('./db/pool.js');
const { requestBenchMark, convertFromB64toBuffer } = require('./gpt-api/toolsesForApi.js');
const { generateText, genetateImage } = require('./gpt-api/gptApi.js');
const { Logger } = require('./logger/logger.js');

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

const generateStory = async (logger) => {
  try {
    const themeIndex = themeIndexObj.themeIndex++;
    const theme = storiesTheme[themeIndex];
    const messages = [
      { 'role': 'system', 'content': 'Write a first-person narrative as a part of notes entry for [Day_id] of surviving on a deserted island. Describe [desc], detailing the personal experiences, challenges faced, and survival strategies used' },
      { 'role': 'user', 'content': `Write a first-person narrative as a diary entry for ${theme.title} of surviving on a deserted island. Describe ${theme.content}, detailing the personal experiences, challenges faced, and survival strategies used` }
    ];
    const textParams = [openai, GPT_MODEL_TEXT, messages];
    const imgParams = [openai, GPT_MODEL_IMAGE, theme.imagePrompt, 1, IMAGE_QUALITY];
    const textBenchMark = await requestBenchMark(generateText, ...textParams);
    const imageBanchMark = await requestBenchMark(genetateImage, ...imgParams);
    await logger.log('Text generation: ' + textBenchMark.deltaTime);
    await logger.log('Image generation: ' + imageBanchMark.deltaTime);
    const imageBuffer = convertFromB64toBuffer(imageBanchMark.data['b64_json']);
    const imageUrl = `res/themeImg/${themeIndex + 1}.jpg`;
    const client = await pool.connect();
    const query = 'INSERT INTO jungleBlog.stories(title, content, image_url) VALUES ($1, $2, $3)';
    await writeFile(`./static/res/themeImg/${themeIndex + 1}.jpg`, imageBuffer);
    await writeFile('./data/nextThemeIndex.json', JSON.stringify(themeIndexObj));
    await client.query(query, [theme.title, textBenchMark.data, imageUrl]);
    client.release();
  } catch (err) {
    await logger.error(err);
  }
};

const startGenerateContent = async () => {
  const logger = await new Logger(path.join(__dirname, 'logs', 'gptLogic'));
  const milisecondsToStart = getMilisecondsToHour(POSTING_STORY_TIME, TIME_ZONE);
  setTimeout(() => {
    generateStory(logger);
    setInterval(generateStory, 1000 * 60 * 60 * 24, logger);
  }, milisecondsToStart);
};

startGenerateContent();

module.exports = { startGenerateContent };