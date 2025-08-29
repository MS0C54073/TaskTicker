'use server';
/**
 * @fileOverview A flow for translating text between English and Russian.
 *
 * - translate - A function that handles the text translation.
 * - TranslateInput - The input type for the translate function.
 * - TranslateOutput - The return type for the translate function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const TranslateInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
});
export type TranslateInput = z.infer<typeof TranslateInputSchema>;

export const TranslateOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateOutput = z.infer<typeof TranslateOutputSchema>;

export async function translate(input: TranslateInput): Promise<TranslateOutput> {
  return translateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translatePrompt',
  input: { schema: TranslateInputSchema },
  output: { schema: TranslateOutputSchema },
  prompt: `You are a translation expert. You can detect the language of the input text (either English or Russian) and translate it to the other language.

Translate the following text. If it's English, translate to Russian. If it's Russian, translate to English.

Input text: {{{text}}}

Return ONLY the translated text.`,
});

const translateFlow = ai.defineFlow(
  {
    name: 'translateFlow',
    inputSchema: TranslateInputSchema,
    outputSchema: TranslateOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
