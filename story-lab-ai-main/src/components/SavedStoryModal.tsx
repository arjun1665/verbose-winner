import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download } from "lucide-react";

interface SavedStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
}

const SavedStoryModal = ({ isOpen, onClose, initialContent = "" }: SavedStoryModalProps) => {
  const [storyContent, setStoryContent] = useState(initialContent);

  const handleGoBack = () => {
    onClose();
  };

  const handleExportAndFinish = () => {
    // Create a simple text file download (DOCX would require additional library)
    const element = document.createElement("a");
    const file = new Blob([storyContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "my-story.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    // Clear the story and close modal
    setStoryContent("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <DialogTitle className="text-xl font-bold text-foreground">
            Your Saved Story
          </DialogTitle>
        </DialogHeader>
        
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <Textarea
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
            className="w-full h-full resize-none text-base story-input"
            placeholder="Your compiled story will appear here. You can edit it directly..."
          />
        </div>
        
        {/* Bottom Action Bar */}
        <div className="px-6 py-4 border-t border-border flex justify-between">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back to Chat
          </Button>
          
          <Button
            onClick={handleExportAndFinish}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium flex items-center gap-2"
            disabled={!storyContent.trim()}
          >
            <Download className="h-4 w-4" />
            Export & Finish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavedStoryModal;