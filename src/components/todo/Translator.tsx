"use client";

import { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { translate } from '@/ai/flows/translate-flow';
import { Skeleton } from '@/components/ui/skeleton';

export function Translator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setTranslatedText('');

    try {
      const result = await translate({ text: inputText });
      setTranslatedText(result.translatedText);
    } catch (err) {
      setError('Sorry, something went wrong during translation. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <ArrowRightLeft className="h-6 w-6 text-primary" />
          <span>Translator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="input-text" className="text-sm font-medium text-muted-foreground">English / Russian</label>
          <Textarea
            id="input-text"
            placeholder="Type or paste text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[100px] text-base"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex justify-center">
          <Button onClick={handleTranslate} disabled={isLoading || !inputText.trim()}>
            {isLoading ? 'Translating...' : 'Translate'}
          </Button>
        </div>

        <div className="grid gap-2">
           <label htmlFor="output-text" className="text-sm font-medium text-muted-foreground">Translation</label>
           <div className="w-full min-h-[100px] p-3 rounded-md border border-input bg-muted/40 text-base">
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
      </CardContent>
    </Card>
  );
}
