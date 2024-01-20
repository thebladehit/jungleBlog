'use strict';

require('dotenv').config();
const WebSocket = require('ws');
const OpenAI = require('openai');
const path = require('node:path');
const { pool } = require('./db/pool.js');
const { Logger } = require('./logger/logger.js');
const { writeFile, createDir } = require('./fs/fs.js');
const storiesTheme = require('./data/thmesForStories.json');
const themeIndexObj = require('./data/nextThemeIndex.json');
const { generateText, genetateImage } = require('./gpt-api/gptApi.js');
const { requestBenchMark, convertFromB64toBuffer } = require('./gpt-api/toolsesForApi.js');
const { OPENAI_TOKEN, GPT_MODEL_TEXT, GPT_MODEL_IMAGE, TIME_ZONE, POSTING_STORY_TIME, IMAGE_QUALITY, PORT, POSTING_INTERVAL } = require('./config/config.js');

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

const notifyAboutNewPost = () => {
  const socket = new WebSocket(`ws://localhost:${PORT}`);
  socket.on('open', () => {
    socket.send(JSON.stringify({ msgType: 'newPost' }));
    socket.close();
  });
};

const generateStory = async (logger) => {
  try {
    const themeIndex = themeIndexObj.themeIndex++;
    const theme = storiesTheme[themeIndex];
    const messages = [
      { 'role': 'system', 'content': `Write a first-person narrative as a part of notes entry for ${themeIndex} of surviving on a deserted island. Describe detailing the personal experiences, challenges faced, and survival strategies used` },
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
    await createDir(path.join(__dirname, 'static', 'res', 'themeImg'));
    await writeFile(`./static/res/themeImg/${themeIndex + 1}.jpg`, imageBuffer);
    await writeFile('./data/nextThemeIndex.json', JSON.stringify(themeIndexObj));
    await client.query(query, [theme.title, textBenchMark.data, imageUrl]);
    client.release();
    notifyAboutNewPost();
  } catch (err) {
    await logger.error(err);
  }
};

const startGenerateContent = async () => {
  const logger = await new Logger(path.join(__dirname, 'logs', 'gptLogic'));
  const milisecondsToStart = getMilisecondsToHour(POSTING_STORY_TIME, TIME_ZONE);
  setTimeout(() => {
    generateStory(logger);
    const intervalTimer = setInterval(() => {
      if (!storiesTheme[themeIndexObj.themeIndex]) {
        clearInterval(intervalTimer);
      } else {
        generateStory(logger);
      }
    }, POSTING_INTERVAL);
  }, milisecondsToStart);
};

module.exports = { startGenerateContent };