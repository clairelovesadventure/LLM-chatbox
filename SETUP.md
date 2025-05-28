# Quick Setup Guide

## 🚀 Get Started in 3 Steps

### Step 1: Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the key (starts with `sk-`)

### Step 2: Configure Environment
```bash
cd server
cp env.example .env
```

Edit `server/.env` and add your API key:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### Step 3: Start the Application
```bash
# Option 1: Use the start script
./start.sh

# Option 2: Manual start
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 💡 Tips

- The AI responds in English by default
- Conversation history is maintained during the session
- Markdown formatting is supported in AI responses
- Rate limiting protects against API abuse

## 🔧 Troubleshooting

**API Key Issues:**
- Ensure your key starts with `sk-`
- Check you have credits in your OpenAI account
- Verify the key is correctly set in `server/.env`

**API Quota Issues:**
- Check your OpenAI billing and usage limits
- Add a payment method to your OpenAI account
- Monitor usage in the OpenAI dashboard

**Port Conflicts:**
- Make sure ports 3000 and 8000 are available
- Kill any existing processes using these ports

**Dependencies:**
- Run `npm run install-all` if you encounter module errors

## 📞 Need Help?

Check the main [README.md](README.md) for detailed documentation and troubleshooting. 