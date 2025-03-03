
import React from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from 'lucide-react';

export interface ChatMessageProps {
  message: string;
  timestamp: Date;
  isUser: boolean;
  isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  timestamp,
  isUser,
  isTyping = false
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 py-2 animate-slide-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-9 w-9 border shadow-sm bg-indigo-100">
          <AvatarImage src="/placeholder.svg" alt="AI" />
          <AvatarFallback className="bg-indigo-500 text-primary-foreground">
            <Bot size={18} />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isUser 
            ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground" 
            : "bg-gradient-to-r from-secondary/80 to-secondary/60 text-secondary-foreground"
        )}
      >
        {isTyping ? (
          <div className="flex items-center h-6">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-0"></div>
              <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-75"></div>
              <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-150"></div>
            </div>
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        )}
        <span className="text-xs opacity-70 block mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {isUser && (
        <Avatar className="h-9 w-9 border shadow-sm bg-primary/10">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User size={18} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
