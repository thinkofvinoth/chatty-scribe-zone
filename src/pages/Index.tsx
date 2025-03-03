
import React from 'react';
import ChatContainer from '@/components/ChatContainer';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col p-6 md:p-10 bg-gradient-to-b from-background to-secondary/20">
      <header className="container mx-auto mb-8 text-center">
        <div className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
          Minimal Chat Experience
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Interactive AI Chat
        </h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          A beautifully designed chat interface with smooth animations and responsive design.
        </p>
      </header>
      
      <main className="container mx-auto flex-1 flex items-center justify-center py-6">
        <div className="w-full max-w-3xl h-[70vh] md:h-[600px] animate-scale-in">
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
