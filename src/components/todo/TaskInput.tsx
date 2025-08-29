"use client";

import { useState, type KeyboardEvent } from "react";
import { Plus, Sparkles, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { suggestTask } from "@/ai/flows/suggest-task-flow";

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [taskText, setTaskText] = useState("");
  const [isSuggesting, setIsSuggesting] = useState(false);

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
      const result = await suggestTask();
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
        placeholder="What needs to be done?"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 text-base h-11"
        aria-label="New task input"
        disabled={isSuggesting}
      />
      <Button onClick={handleSuggestTask} size="icon" variant="outline" disabled={isSuggesting} aria-label="Suggest a task">
        {isSuggesting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="h-5 w-5 text-primary" />
        )}
      </Button>
      <Button onClick={handleAddTask} size="lg" disabled={isSuggesting}>
        <Plus className="h-5 w-5" />
        <span className="sr-only sm:not-sr-only sm:ml-2">Add</span>
      </Button>
    </div>
  );
}
