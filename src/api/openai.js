import OpenAI from 'openai';
require('dotenv').config();

const API_KEY = process.env.OPENAI_API_KEY;
const BASE_URL = 'https://api.openai.com';

const openai = new OpenAI({
  apiKey: Y,
  apiBase: 'https://api.openai.com',
  dangerouslyAllowBrowser: true // Only if you are aware of the risks
});

async function generateText(prompt) {
  try {
    const completion = await openai.createCompletion({
      model: "gpt-4-0125-preview", // Or whichever model you're intending to use
      prompt: prompt,
      max_tokens: 150
    });
    return completion.choices[0].text;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null;
  }
}
export default generateText;