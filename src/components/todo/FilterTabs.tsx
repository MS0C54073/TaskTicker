"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Filter } from "@/app/page";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface FilterTabsProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export default function FilterTabs({ filter, setFilter }: FilterTabsProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="px-6 mb-4">
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as Filter)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">{t.filterAll}</TabsTrigger>
          <TabsTrigger value="active">{t.filterActive}</TabsTrigger>
          <TabsTrigger value="completed">{t.filterCompleted}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
