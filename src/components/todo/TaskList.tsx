import { ScrollArea } from "@/components/ui/scroll-area";
import TaskItem from "@/components/todo/TaskItem";
import type { Task } from "@/app/page";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10 h-72 flex items-center justify-center">
        <p>No tasks here. Great job, or time to add some!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-72 w-full">
      <ul className="space-y-2 pr-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))}
      </ul>
    </ScrollArea>
  );
}
