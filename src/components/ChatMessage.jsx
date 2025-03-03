
import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';

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

export default ChatMessage;
