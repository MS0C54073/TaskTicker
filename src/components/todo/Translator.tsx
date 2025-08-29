"use client";

import { useState } from 'react';
import { ArrowRightLeft, ArrowLeftRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { translateAction } from '@/ai/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export function Translator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setTranslatedText('');

    try {
      const result = await translateAction({ text: inputText });
      setTranslatedText(result.translatedText);
    } catch (err) {
      setError(t.translatorError);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <ArrowRightLeft className="h-6 w-6 text-primary" />
          <span>{t.translatorTitle}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 relative">
          <label htmlFor="input-text" className="text-sm font-medium text-muted-foreground">{t.translatorInputLabel}</label>
          <Textarea
            id="input-text"
            placeholder={t.translatorInputPlaceholder}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[100px] text-base"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex justify-center items-center my-[-8px]">
            <Button variant="ghost" size="icon" onClick={handleSwap} disabled={isLoading} aria-label={t.swapButtonAriaLabel}>
                <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
            </Button>
        </div>

        <div className="grid gap-2">
           <label htmlFor="output-text" className="text-sm font-medium text-muted-foreground">{t.translatorOutputLabel}</label>
           <Textarea
             id="output-text"
             placeholder={t.translatorOutputPlaceholder}
             value={translatedText}
             readOnly
             className="min-h-[100px] text-base bg-muted/40"
             disabled={isLoading}
           />
           <div className="w-full min-h-[100px] p-3 rounded-md border border-input bg-muted/40 text-base hidden">
            {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[60%]" />
                </div>
            ) : error ? (
                <p className="text-destructive">{error}</p>
            ) : (
                <p>{translatedText}</p>
            )}
           </div>
        </div>
        
        <div className="flex justify-center">
          <Button onClick={handleTranslate} disabled={isLoading || !inputText.trim()}>
            {isLoading ? t.translatingButton : t.translateButton}
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
