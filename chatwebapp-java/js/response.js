const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai-api');
const app = express();

// Set up OpenAI API client
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Parse JSON request body
app.use(bodyParser.json());

// Handle incoming requests to /api/chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Generate ChatGPT response
    const response = await openai.completions.create({
      engine: 'davinci',
      prompt: `User: ${message}\nChatGPT:`,
      maxTokens: 50,
      n: 1,
      stop: ['\n']
    });

    // Send response back to client
    res.json({ response: response.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
