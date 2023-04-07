import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

// openai setup

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

// routes

// get route to check if backend loads

router.get('/', (req, res) => {
  res.send('Hello from DALL-E');
});

// post route for sending prompt to ai to generate an image using openai createImage method

router.post('/', (req, res) => {
  const prompt = req.body.prompt;
  console.log(prompt);
  openai
    .createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    })
    .then((data) => {
      res.status(200).json({ photo: data.data.data[0].b64_json });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send(error?.response.data.error.message || 'Something went wrong');
    });
});

export default router;
