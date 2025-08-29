"use client";

import { useState, type KeyboardEvent } from "react";
import { Plus, Sparkles, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { suggestTaskAction } from "@/ai/actions";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [taskText, setTaskText] = useState("");
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const handleAddTask = () => {
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const handleSuggestTask = async () => {
    setIsSuggesting(true);
    try {
      const result = await suggestTaskAction();
      setTaskText(result.task);
    } catch (error) {
      console.error("Failed to suggest task:", error);
      // Optionally, show an error to the user
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        type="text"
        placeholder={t.inputPlaceholder}
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 text-base h-11"
        aria-label={t.inputAriaLabel}
        disabled={isSuggesting}
      />
      <Button onClick={handleSuggestTask} size="icon" variant="outline" disabled={isSuggesting} aria-label={t.suggestButtonAriaLabel}>
        {isSuggesting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="h-5 w-5 text-primary" />
        )}
      </Button>
      <Button onClick={handleAddTask} size="lg" disabled={isSuggesting}>
        <Plus className="h-5 w-5" />
        <span className="sr-only sm:not-sr-only sm:ml-2">{t.addButton}</span>
      </Button>
    </div>
  );
}
