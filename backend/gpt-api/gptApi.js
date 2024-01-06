'use strict';

const generateText = async (openai, model, messages, maxTokens = 2000) => {
  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature: 1,
    max_tokens: maxTokens,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });
  return response.choices[0].message.content;
};

const genetateImage = async (openai, model, prompt, quantity, size, response_format = 'b64_json') => {
  const response = await openai.images.generate({
    model,
    prompt,
    n: quantity,
    size,
    response_format
  });
  return response.data[0];
};  

module.exports = {
  generateText, genetateImage
};