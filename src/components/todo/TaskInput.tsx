"use client";

import { useState, type KeyboardEvent } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [taskText, setTaskText] = useState("");
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
      />
      <Button onClick={handleAddTask} size="lg">
        <Plus className="h-5 w-5" />
        <span className="sr-only sm:not-sr-only sm:ml-2">{t.addButton}</span>
      </Button>
    </div>
  );
}
