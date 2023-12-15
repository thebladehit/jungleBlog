'use strict';

const OpenAI = require('openai');
const { OPENAI_TOKEN } = require('../config/config.js');

const openai = new OpenAI({
  apiKey: OPENAI_TOKEN
});

const generateText = async (model, messages, maxTokens = 2000) => {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature: 1,
      max_tokens: maxTokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });
    console.log(response); // temporary
    return response.choices[0].message.content;
  } catch (e) {
    throw e;
  }
};

const genetateImage = async (model, prompt, quantity, size) => {
  const response = await openai.images.generate({
    model,
    prompt,
    n: quantity,
    size
  });
  console.log(response); // temporary
  return response.data[0].url;
};  

module.exports = {
  generateText, genetateImage
};