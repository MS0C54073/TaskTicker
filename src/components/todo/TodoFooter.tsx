import { Button } from "@/components/ui/button";

interface TodoFooterProps {
  activeCount: number;
  hasCompletedTasks: boolean;
  onClearCompleted: () => void;
}

export default function TodoFooter({
  activeCount,
  hasCompletedTasks,
  onClearCompleted,
}: TodoFooterProps) {
  return (
    <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
      <span>
        {activeCount} {activeCount === 1 ? "item" : "items"} left
      </span>
      {hasCompletedTasks && (
        <Button
          variant="ghost"
          onClick={onClearCompleted}
          className="text-muted-foreground hover:text-foreground px-2 h-8"
        >
          Clear completed
        </Button>
      )}
    </div>
  );
}
