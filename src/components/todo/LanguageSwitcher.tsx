'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleLanguage} aria-label="Switch language">
      <Languages className="h-5 w-5" />
    </Button>
  );
}
