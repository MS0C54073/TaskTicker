'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

/**
 * Defines the available language options.
 */
type Language = 'en' | 'ru';

/**
 * Defines the shape of the LanguageContext.
 */
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

/**
 * Creates the React Context for language management.
 */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Provides the language state to its children components.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to be wrapped by the provider.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * A custom hook to access the language context.
 * Throws an error if used outside of a LanguageProvider.
 * @returns {LanguageContextType} The language context value.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
