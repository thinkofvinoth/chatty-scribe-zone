
import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, Avatar, Divider } from '@mui/material';
import { SmartToy } from '@mui/icons-material';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const INITIAL_MESSAGES = [
  {
    id: '1',
    content: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: new Date(),
    isUser: false
  }
];

const ChatContainer = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  const handleSendMessage = (content) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      isUser: true
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        timestamp: new Date(),
        isUser: false
      };
      
      setIsTyping(false);
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500 + Math.random() * 1500); // Random delay between 1.5-3s
  };
  
  // Simple AI response generator
  const getAIResponse = (userMessage) => {
    const responses = [
      "I understand. Can you tell me more about that?",
      "That's interesting! How does that make you feel?",
      "I see. What would you like to know about this topic?",
      "Thank you for sharing. Is there anything specific you'd like me to help with?",
      "I appreciate your message. Let me know if you need any assistance.",
      "I'm processing what you've said. Could you provide more details?",
      "That's a great point! Would you like me to elaborate on any aspect?",
      "I'm here to help with whatever you need.",
      `I've analyzed "${userMessage.substring(0, 15)}..." and I'm ready to assist further.`,
      "Your input is valuable. Let's explore this topic together."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  return (
    <Paper 
      elevation={3}
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        maxWidth: '800px', 
        mx: 'auto',
        borderRadius: 4,
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: 1, borderColor: 'divider' }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <SmartToy fontSize="small" />
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="medium">AI Assistant</Typography>
          <Typography variant="caption" color="text.secondary">Always ready to help</Typography>
        </Box>
      </Box>
      
      <Box 
        sx={{ 
          flex: 1, 
          p: 2, 
          overflowY: 'auto',
          bgcolor: 'background.default'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pb: 2 }}>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              timestamp={message.timestamp}
              isUser={message.isUser}
            />
          ))}
          
          {isTyping && (
            <ChatMessage
              message=""
              timestamp={new Date()}
              isUser={false}
              isTyping={true}
            />
          )}
          <div ref={messagesEndRef} />
        </Box>
      </Box>
      
      <Divider />
      
      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping}
        />
        
        <Typography variant="caption" align="center" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
          Type a message and press Enter to send
        </Typography>
      </Box>
    </Paper>
  );
};

export default ChatContainer;
