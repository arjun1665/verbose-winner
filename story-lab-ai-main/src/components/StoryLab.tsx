import ImprovementPanel from "./ImprovementPanel";
import CreationPanel from "./CreationPanel";

const StoryLab = () => {
  return (
    <main className="flex-1 flex min-h-[calc(100vh-4rem)]">
      {/* Left Panel - Story Improvement */}
      <div className="w-1/2 border-r border-border">
        <ImprovementPanel />
      </div>
      
      {/* Right Panel - Story Creation */}
      <div className="w-1/2">
        <CreationPanel />
      </div>
    </main>
  );
};

export default StoryLab;