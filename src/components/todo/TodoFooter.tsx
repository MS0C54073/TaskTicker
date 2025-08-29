import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

/**
 * Props for the TodoFooter component.
 */
interface TodoFooterProps {
  /** The number of active (incomplete) tasks. */
  activeCount: number;
  /** A boolean indicating if there are any completed tasks. */
  hasCompletedTasks: boolean;
  /** Callback function to clear all completed tasks. */
  onClearCompleted: () => void;
}

/**
 * The footer component for the to-do list.
 * It displays the count of active items and a "Clear completed" button.
 */
export default function TodoFooter({
  activeCount,
  hasCompletedTasks,
  onClearCompleted,
}: TodoFooterProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const itemsLeftText = activeCount === 1 ? t.itemLeft : t.itemsLeft;

  return (
    <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
      <span>
        {activeCount} {itemsLeftText}
      </span>
      {hasCompletedTasks && (
        <Button
          variant="ghost"
          onClick={onClearCompleted}
          className="text-muted-foreground hover:text-foreground px-2 h-8"
        >
          {t.clearCompleted}
        </Button>
      )}
    </div>
  );
}
