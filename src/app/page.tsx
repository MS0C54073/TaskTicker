"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import TaskInput from "@/components/todo/TaskInput";
import FilterTabs from "@/components/todo/FilterTabs";
import TaskList from "@/components/todo/TaskList";
import TodoFooter from "@/components/todo/TodoFooter";
import { LanguageProvider } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/todo/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export type Filter = "all" | "active" | "completed";

const initialTasks: Task[] = [
  { id: '1', text: 'Learn Next.js and Tailwind CSS', completed: true, createdAt: Date.now() - 200000 },
  { id: '2', text: 'Build a beautiful To-Do App', completed: false, createdAt: Date.now() - 100000 },
  { id: '3', text: 'Deploy to the web', completed: false, createdAt: Date.now() },
];

function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>("all");
  const { language } = useLanguage();
  const t = translations[language];

  const addTask = (text: string) => {
    if (text.trim() === "") return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = useMemo(() => {
    const sortedTasks = [...tasks].sort((a, b) => b.createdAt - a.createdAt);
    switch (filter) {
      case "active":
        return sortedTasks.filter((task) => !task.completed);
      case "completed":
        return sortedTasks.filter((task) => task.completed);
      default:
        return sortedTasks;
    }
  }, [tasks, filter]);
  
  const activeCount = useMemo(() => {
    return tasks.filter((task) => !task.completed).length;
  }, [tasks]);
  
  const hasCompletedTasks = useMemo(() => {
    return tasks.some((task) => task.completed);
  }, [tasks]);

  return (
    <div className="w-full max-w-lg mt-8">
      <header className="text-center mb-6 relative">
        <h1 className="text-6xl font-extrabold text-primary tracking-tighter">
          {t.title}
        </h1>
        <div className="absolute top-1/2 -translate-y-1/2 right-0">
          <LanguageSwitcher />
        </div>
      </header>

      <Card className="w-full shadow-lg rounded-lg mb-8">
        <CardHeader className="p-6">
          <TaskInput onAddTask={addTask} />
        </CardHeader>
        <CardContent className="p-0">
          <FilterTabs filter={filter} setFilter={setFilter} />
          <div className="px-6 pb-6">
            <TaskList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t bg-muted/30 rounded-b-lg">
          <TodoFooter
            activeCount={activeCount}
            hasCompletedTasks={hasCompletedTasks}
            onClearCompleted={clearCompleted}
          />
        </CardFooter>
      </Card>
    </div>
  );
}


export default function Home() {
  return (
    <LanguageProvider>
      <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-6 md:p-8 font-body">
        <TodoApp />
      </main>
    </LanguageProvider>
  );
}
