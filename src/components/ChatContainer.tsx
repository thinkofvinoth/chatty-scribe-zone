
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bot } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: new Date(),
    isUser: false
  }
];

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      isUser: true
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
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
  const getAIResponse = (userMessage: string): string => {
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
    <div className="flex flex-col h-full max-w-3xl mx-auto rounded-2xl overflow-hidden border shadow-md bg-gradient-to-b from-card to-card/80 backdrop-blur-sm">
      <div className="p-4 flex items-center gap-3 border-b bg-secondary/30">
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="AI" />
          <AvatarFallback className="bg-indigo-500 text-white">
            <Bot size={18} />
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">AI Assistant</h2>
          <p className="text-xs text-muted-foreground">Always ready to help</p>
        </div>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-secondary/10">
        <div className="flex flex-col gap-3 pb-4">
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
        </div>
      </ScrollArea>
      
      <Separator />
      
      <div className="p-4 bg-card/40">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping}
        />
        
        <p className="text-xs text-center text-muted-foreground mt-3">
          Type a message and press Enter to send
        </p>
      </div>
    </div>
  );
};

export default ChatContainer;
