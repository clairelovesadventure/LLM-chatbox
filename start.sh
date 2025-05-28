#!/bin/bash

echo "🤖 Starting LLM Chatbot Application..."
echo ""

# Check if .env file exists
if [ ! -f "server/.env" ]; then
    echo "⚠️  Warning: server/.env file not found!"
    echo "Please create server/.env file with your OpenAI API key:"
    echo ""
    echo "cd server"
    echo "cp env.example .env"
    echo "# Then edit .env and add your OPENAI_API_KEY"
    echo ""
    exit 1
fi

# Check if OpenAI API key is set
if ! grep -q "OPENAI_API_KEY=sk-" server/.env; then
    echo "⚠️  Warning: OpenAI API key not configured!"
    echo "Please edit server/.env and add your OpenAI API key"
    echo ""
    exit 1
fi

echo "✅ Environment configured"
echo "🚀 Starting servers..."
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
npm run dev 