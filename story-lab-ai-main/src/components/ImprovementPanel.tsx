import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Send, Plus } from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'document';
  content: string;
  timestamp: Date;
}

const ImprovementPanel = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

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
        content: "I'll help you refine your story. Here's my suggestion for improving that section...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const docMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'document',
        content: `Uploaded: ${file.name}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, docMessage]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const docMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'document',
        content: `Uploaded: ${file.name}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, docMessage]);
    }
  };

  const addLatestToStory = () => {
    const latestMessage = messages.filter(m => m.type === 'ai').pop();
    if (latestMessage) {
      // This would open the SavedStoryModal component
      console.log("Adding to story:", latestMessage.content);
    }
  };

  return (
    <div className="story-panel h-full flex flex-col p-6 m-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Refine Your Draft</h2>
        <p className="text-muted-foreground">Upload your story or provide instructions to improve your writing</p>
      </div>

      {/* Upload Zone */}
      <div 
        className={`upload-zone mb-6 ${isDragOver ? 'border-primary bg-upload-zone-hover' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <div className="text-lg font-medium text-foreground mb-2">Upload Document</div>
          <div className="text-sm text-muted-foreground">
            Drag & drop your PDF or DOCX file here, or click to browse
          </div>
        </label>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              message.type === 'user' 
                ? 'bg-primary text-primary-foreground ml-auto' 
                : message.type === 'document'
                ? 'bg-secondary text-secondary-foreground border border-border flex items-center gap-2'
                : 'bg-muted text-muted-foreground'
            }`}>
              {message.type === 'document' && <FileText className="h-4 w-4" />}
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe how you'd like to improve your story..."
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
        
        {/* Add Latest to Story Button */}
        <Button 
          onClick={addLatestToStory}
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium"
          disabled={!messages.some(m => m.type === 'ai')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Latest to Story
        </Button>
      </div>
    </div>
  );
};

export default ImprovementPanel;