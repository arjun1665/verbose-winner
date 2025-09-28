import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Verbose AI
          </div>
        </div>
        
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
            Saved Stories
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;