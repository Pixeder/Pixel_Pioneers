import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Initializes and configures the Google Gemini Pro model.
 *
 * It's crucial to store your API key securely in an environment variable (`.env` file)
 * and not hardcode it in your source files.
 *
 * Example .env file:
 * GEMINI_API_KEY=your_api_key_here
 */

// 1. Get the API key from environment variables.
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set in the environment variables.');
}

// 2. Initialize the GoogleGenerativeAI instance with the API key.
const genAI = new GoogleGenerativeAI(apiKey);

// 3. Get the specific generative model to use for finding resources.
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export { model };
