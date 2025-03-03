
import React, { useState } from 'react';
import { Send, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "flex items-end gap-2 w-full transition-opacity",
        disabled && "opacity-60"
      )}
    >
      {(isFocused || message) && (
        <Avatar className="h-9 w-9 border shadow-sm bg-primary/10 transition-all duration-300 animate-fade-in">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User size={18} />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className="relative flex-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type a message..."
          className="w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pr-10 min-h-[80px] max-h-[200px] transition-colors"
          rows={2}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || disabled}
          className="absolute bottom-3 right-3 h-8 w-8 rounded-full transition-all hover:scale-105 active:scale-95 bg-primary hover:bg-primary/90"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
