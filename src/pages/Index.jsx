
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Paper, 
  CssBaseline, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import ChatContainer from '../components/ChatContainer';

const Index = () => {
  const [mode, setMode] = useState('light');

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
            <ChatContainer />
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
