# LLM-Based Chatbot

A modern, responsive chatbot application built with React, TypeScript, and Node.js, powered by OpenAI's GPT models.

## Features

- 🤖 **AI-Powered Conversations**: Integrated with OpenAI GPT-3.5-turbo for intelligent responses
- 💬 **Real-time Chat Interface**: Beautiful, modern chat UI with message bubbles
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI/UX**: Glass-morphism design with smooth animations
- 📝 **Markdown Support**: AI responses support markdown formatting
- 🔒 **Rate Limiting**: Built-in protection against API abuse
- ⚡ **Fast & Lightweight**: Optimized for performance

## Tech Stack

### Frontend
- React 18 with TypeScript
- Styled Components for styling
- Axios for HTTP requests
- React Markdown for message formatting

### Backend
- Node.js with Express
- OpenAI API integration
- CORS and security middleware
- Rate limiting protection

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 14 or higher)
2. **npm** or **yarn** package manager
3. **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/api-keys)

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (root, server, and client)
npm run install-all
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
cp env.example .env
```

Edit the `.env` file and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=8000
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Start the Application

From the root directory, run:

```bash
# Start both server and client concurrently
npm run dev
```

This will start:
- Backend server on `http://localhost:8000`
- Frontend client on `http://localhost:3000`

The browser should automatically open to the chatbot interface.

## Usage

1. **Start Chatting**: Type your message in the input field at the bottom
2. **Send Messages**: Press Enter or click the Send button
3. **View Responses**: The AI will respond with helpful, contextual answers
4. **Conversation History**: The chat maintains context throughout the conversation

## API Endpoints

### POST `/api/chat`
Send a message to the AI chatbot.

**Request Body:**
```json
{
  "message": "Your message here",
  "conversationHistory": [
    {
      "role": "user|assistant",
      "content": "Previous message content"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "AI response text",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  }
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Configuration

### Customizing AI Behavior

Edit the system message in `server/index.js`:

```javascript
const messages = [
  {
    role: 'system',
    content: 'Your custom system prompt here...'
  },
  // ... rest of conversation
];
```

### Adjusting Rate Limits

Modify the rate limiting settings in `server/index.js`:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // requests per window
  message: 'Too many requests...'
});
```

## Deployment

### Frontend (Client)

```bash
cd client
npm run build
```

Deploy the `build` folder to your preferred hosting service (Netlify, Vercel, etc.).

### Backend (Server)

Deploy to platforms like Heroku, Railway, or DigitalOcean. Make sure to:

1. Set environment variables in your hosting platform
2. Update CORS settings for your production domain
3. Configure proper rate limiting for production

## Troubleshooting

### Common Issues

1. **"Invalid API Key" Error**
   - Verify your OpenAI API key is correct
   - Check that the key has sufficient credits
   - Ensure the `.env` file is in the `server` directory

2. **"API quota exceeded" Error**
   - Check your OpenAI account billing and usage
   - Add payment method to your OpenAI account
   - Verify you have available credits

3. **Connection Refused**
   - Make sure both server and client are running
   - Check that ports 3000 and 8000 are available
   - Verify firewall settings

4. **CORS Errors**
   - Ensure the server is running on port 8000
   - Check CORS configuration in `server/index.js`

### Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Review server logs in the terminal
3. Verify all dependencies are installed correctly
4. Ensure your OpenAI API key is valid and has credits

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Note**: This application requires an active OpenAI API key and will incur costs based on usage. Monitor your API usage through the OpenAI dashboard. 