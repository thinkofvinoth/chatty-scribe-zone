
import React, { useState } from 'react';
import { Send, Person } from '@mui/icons-material';
import { 
  TextField, 
  Button, 
  Box, 
  Avatar,
  Paper
} from '@mui/material';

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Paper 
      component="form"
      onSubmit={handleSubmit} 
      sx={{
        display: 'flex', 
        alignItems: 'flex-end', 
        gap: 2, 
        width: '100%',
        p: 2,
        opacity: disabled ? 0.6 : 1,
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
          disabled={disabled}
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
              handleSubmit(e);
            }
          }}
        />
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
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
  );
};

export default ChatInput;
