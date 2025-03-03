
import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Paper, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  TextField,
  Button,
  Avatar,
  Divider
} from '@mui/material';
import { 
  Brightness4, 
  Brightness7,
  Person,
  Send,
  SmartToy
} from '@mui/icons-material';

// Initial messages for the chat
const INITIAL_MESSAGES = [
  {
    id: '1',
    content: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: new Date(),
    isUser: false
  }
];

const Index = () => {
  const [mode, setMode] = useState('light');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    // Check for system preference or saved preference
    const savedTheme = localStorage.getItem('theme') || null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setMode(savedTheme);
    } else if (prefersDark) {
      setMode('dark');
    }
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#6366f1',
            light: '#8385f6',
          },
          background: {
            default: mode === 'light' ? '#f8fafc' : '#121927',
            paper: mode === 'light' ? '#ffffff' : '#1e293b',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                transition: 'background-color 0.3s, box-shadow 0.3s',
              },
            },
          },
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        content: message,
        timestamp: new Date(),
        isUser: true
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");
      setIsTyping(true);
      
      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          content: getAIResponse(message),
          timestamp: new Date(),
          isUser: false
        };
        
        setIsTyping(false);
        setMessages((prev) => [...prev, aiResponse]);
      }, 1500 + Math.random() * 1500); // Random delay between 1.5-3s
    }
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

  // Chat Message Component
  const ChatMessage = ({
    message,
    timestamp,
    isUser,
    isTyping = false
  }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-start',
          gap: 1.5,
          py: 1,
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          animation: 'slideIn 0.3s ease-out',
          '@keyframes slideIn': {
            from: { opacity: 0, transform: 'translateY(10px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        {!isUser && (
          <Avatar
            sx={{
              bgcolor: 'primary.light',
              border: 1,
              borderColor: 'divider',
              boxShadow: 1
            }}
          >
            <SmartToy fontSize="small" />
          </Avatar>
        )}
        
        <Paper
          elevation={1}
          sx={{
            maxWidth: '80%',
            borderRadius: 3,
            px: 2,
            py: 1.5,
            background: isUser 
              ? 'linear-gradient(to right, #6366f1, rgba(99, 102, 241, 0.9))' 
              : 'linear-gradient(to right, rgba(209, 213, 219, 0.8), rgba(209, 213, 219, 0.6))',
            color: isUser ? 'white' : 'text.primary'
          }}
        >
          {isTyping ? (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '24px' }}>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {[0, 1, 2].map((i) => (
                  <Box 
                    key={i}
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'currentColor',
                      opacity: 0.7,
                      animation: 'pulse 1.5s infinite',
                      animationDelay: `${i * 0.15}s`,
                      '@keyframes pulse': {
                        '0%, 100%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.3)' }
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          ) : (
            <Typography 
              variant="body2" 
              sx={{ 
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {message}
            </Typography>
          )}
          <Typography 
            variant="caption" 
            sx={{ display: 'block', mt: 0.5, opacity: 0.7 }}
          >
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Paper>

        {isUser && (
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              border: 1,
              borderColor: 'divider',
              boxShadow: 1
            }}
          >
            <Person fontSize="small" />
          </Avatar>
        )}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, md: 4 },
          background: mode === 'light' 
            ? 'linear-gradient(to bottom, #f8fafc, #f1f5f9, #e2e8f0)' 
            : 'linear-gradient(to bottom, #0f172a, #1e293b)',
          transition: 'background 0.3s',
        }}
      >
        <Box 
          component="header" 
          sx={{ 
            maxWidth: 'lg', 
            mx: 'auto', 
            mb: 3, 
            textAlign: 'center',
            position: 'relative',
            width: '100%'
          }}
        >
          <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
            <IconButton 
              onClick={toggleTheme} 
              color="inherit"
              sx={{
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' },
              }}
              aria-label="Toggle theme"
            >
              {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Box>

          <Paper 
            sx={{ 
              display: 'inline-block', 
              px: 1.5, 
              py: 0.5, 
              mb: 1,
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              borderRadius: 'full',
            }}
          >
            <Typography variant="caption" fontWeight="medium">
              Enhanced Chat Experience
            </Typography>
          </Paper>

          <Typography 
            variant="h4" 
            fontWeight="bold" 
            gutterBottom
            sx={{
              background: 'linear-gradient(to right, #6366f1, rgba(99, 102, 241, 0.7))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Interactive AI Chat
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            A beautifully designed chat interface with smooth animations and responsive design
          </Typography>
        </Box>
        
        <Box 
          component="main" 
          sx={{ 
            maxWidth: 'lg', 
            mx: 'auto', 
            flex: '1', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            py: 2,
            width: '100%'
          }}
        >
          <Box 
            sx={{ 
              width: '100%', 
              maxWidth: '800px', 
              height: { xs: '75vh', md: '600px' },
              animation: 'scaleIn 0.4s ease-out',
              '@keyframes scaleIn': {
                from: { opacity: 0, transform: 'scale(0.98)' },
                to: { opacity: 1, transform: 'scale(1)' }
              }
            }}
          >
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
                  {messages.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg.content}
                      timestamp={msg.timestamp}
                      isUser={msg.isUser}
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
                <Paper 
                  component="form"
                  onSubmit={handleSendMessage} 
                  sx={{
                    display: 'flex', 
                    alignItems: 'flex-end', 
                    gap: 2, 
                    width: '100%',
                    p: 2,
                    opacity: isTyping ? 0.6 : 1,
                    transition: 'opacity 0.2s',
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                  }}
                >
                  {(isFocused || message) && (
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        border: 1,
                        borderColor: 'divider',
                        boxShadow: 1,
                        bgcolor: 'primary.light',
                        transition: 'all 0.3s',
                        animation: 'fadeIn 0.3s',
                      }}
                    >
                      <Person fontSize="small" />
                    </Avatar>
                  )}
                  
                  <Box sx={{ position: 'relative', flexGrow: 1 }}>
                    <TextField
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Type a message..."
                      multiline
                      maxRows={4}
                      disabled={isTyping}
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          pr: 6,
                          minHeight: '80px',
                          maxHeight: '200px',
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      disabled={!message.trim() || isTyping}
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        minWidth: 'auto',
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        p: 0
                      }}
                      color="primary"
                      variant="contained"
                    >
                      <Send fontSize="small" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </Box>
                </Paper>
                
                <Typography variant="caption" align="center" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
                  Type a message and press Enter to send
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
        
        <Box 
          component="footer" 
          sx={{ 
            maxWidth: 'lg', 
            mx: 'auto', 
            mt: 'auto', 
            pt: 3, 
            pb: 2, 
            textAlign: 'center' 
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Designed with precision and attention to detail
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Index;
