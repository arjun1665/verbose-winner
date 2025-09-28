import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Plus } from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const CreationPanel = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Here's a creative story beginning based on your idea. Let me craft something engaging for you...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const addMessageToStory = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      console.log("Adding message to story:", message.content);
      // This would add the message to the saved story
    }
  };

  return (
    <div className="story-panel h-full flex flex-col p-6 m-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Create From Scratch</h2>
        <p className="text-muted-foreground">Start with an idea and let AI help you craft your story</p>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div className="space-y-4">
              <div className="text-6xl">✨</div>
              <div className="text-lg text-muted-foreground">
                Start your creative journey
              </div>
              <div className="text-sm text-muted-foreground max-w-sm">
                Share an idea, character, setting, or genre and I'll help you create an amazing story
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="group relative">
              <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {message.content}
                </div>
              </div>
              
              {/* Add to story button for AI messages */}
              {message.type === 'ai' && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute -bottom-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  onClick={() => addMessageToStory(message.id)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add to Story
                </Button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Share your story idea... (e.g., 'Write a sci-fi opening about a robot who discovers music')"
          className="story-input resize-none"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button 
          onClick={handleSendMessage}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CreationPanel;