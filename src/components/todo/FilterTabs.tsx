"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Filter } from "@/app/page";

interface FilterTabsProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export default function FilterTabs({ filter, setFilter }: FilterTabsProps) {
  return (
    <div className="px-6 mb-4">
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as Filter)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
