"use client";

import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Task } from "@/app/page";

/**
 * Props for the TaskItem component.
 */
interface TaskItemProps {
  /** The task object to display. */
  task: Task;
  /** Callback function to toggle the task's completion status. */
  onToggle: (id: string) => void;
  /** Callback function to delete the task. */
  onDelete: (id: string) => void;
}

/**
 * A component that displays a single task item with a checkbox and a delete button.
 */
export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li
      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/40 group transition-all duration-200 hover:bg-secondary"
    >
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="h-5 w-5 rounded-[4px] data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground data-[state=checked]:border-accent"
        aria-labelledby={`task-label-${task.id}`}
      />
      <label
        id={`task-label-${task.id}`}
        htmlFor={`task-${task.id}`}
        className={cn(
          "flex-1 text-base cursor-pointer transition-colors",
          task.completed && "line-through text-muted-foreground"
        )}
      >
        {task.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="h-9 w-9 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
        aria-label={`Delete task: ${task.text}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
}
