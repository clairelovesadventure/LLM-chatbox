import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  
  h1 {
    color: white;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    margin: 0.5rem 0 0 0;
    font-size: 0.9rem;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 18px;
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  background: ${props => props.$isUser 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.$isUser ? 'white' : '#333'};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: ${props => props.$isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'};
  
  .message-content {
    line-height: 1.4;
    
    p {
      margin: 0;
    }
    
    code {
      background: ${props => props.$isUser ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.9em;
    }
    
    pre {
      background: ${props => props.$isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
      padding: 0.5rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 0.5rem 0;
      
      code {
        background: none;
        padding: 0;
      }
    }
  }
  
  .timestamp {
    font-size: 0.7rem;
    opacity: 0.7;
    margin-top: 0.5rem;
  }
`;

const InputContainer = styled.div`
  padding: 1rem 2rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const InputForm = styled.form`
  display: flex;
  gap: 0.5rem;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
  }
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const SendButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
  
  .dots {
    display: flex;
    gap: 0.2rem;
    
    span {
      width: 4px;
      height: 4px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;
      
      &:nth-child(1) { animation-delay: -0.32s; }
      &:nth-child(2) { animation-delay: -0.16s; }
    }
  }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    } 40% {
      transform: scale(1);
    }
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff6b6b;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await axios.post('http://localhost:8000/api/chat', {
        message: inputValue,
        conversationHistory
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      setError(
        error.response?.data?.error || 
        'Failed to send message. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ChatContainer>
      <Header>
        <h1>🤖 AI Chatbot</h1>
        <p>Ask me anything! I'm here to help.</p>
      </Header>
      
      <MessagesContainer>
        {messages.map((message) => (
          <MessageBubble key={message.id} $isUser={message.sender === 'user'}>
            <div className="message-content">
              {message.sender === 'bot' ? (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              ) : (
                <p>{message.text}</p>
              )}
            </div>
            <div className="timestamp">
              {formatTime(message.timestamp)}
            </div>
          </MessageBubble>
        ))}
        
        {isLoading && (
          <LoadingIndicator>
            <span>AI is thinking</span>
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </LoadingIndicator>
        )}
        
        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}
        
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <InputContainer>
        <InputForm onSubmit={sendMessage}>
          <MessageInput
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
          />
          <SendButton type="submit" disabled={isLoading || !inputValue.trim()}>
            {isLoading ? '...' : 'Send'}
          </SendButton>
        </InputForm>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatBot; 