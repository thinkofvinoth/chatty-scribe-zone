
import React, { useState, useEffect } from 'react';
import ChatContainer from '@/components/ChatContainer';
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check for system preference or saved preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen w-full flex flex-col p-4 md:p-8 bg-gradient-to-b from-background via-background/95 to-secondary/20 transition-colors duration-300">
      <header className="container mx-auto mb-6 text-center relative">
        <div className="absolute right-4 top-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full h-10 w-10 bg-secondary/50 hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
        </div>
        <div className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
          Enhanced Chat Experience
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Interactive AI Chat
        </h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          A beautifully designed chat interface with smooth animations and responsive design
        </p>
      </header>
      
      <main className="container mx-auto flex-1 flex items-center justify-center py-4">
        <div className="w-full max-w-3xl h-[75vh] md:h-[600px] animate-scale-in shadow-xl">
          <ChatContainer />
        </div>
      </main>
      
      <footer className="container mx-auto mt-auto pt-6 pb-4 text-center text-sm text-muted-foreground">
        <p>Designed with precision and attention to detail</p>
      </footer>
    </div>
  );
};

export default Index;
