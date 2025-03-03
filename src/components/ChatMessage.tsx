
import React from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        "flex w-full items-start gap-2 py-2 animate-slide-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 border shadow-sm">
          <AvatarImage src="/placeholder.svg" alt="AI" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 shadow-sm",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-secondary text-secondary-foreground"
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
          <p className="text-sm leading-relaxed">{message}</p>
        )}
        <span className="text-xs opacity-70 block mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 border shadow-sm">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
