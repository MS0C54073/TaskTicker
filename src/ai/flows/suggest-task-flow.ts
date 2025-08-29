/**
 * @fileOverview A flow for suggesting a new task.
 *
 * - suggestTaskFlow - A function that suggests a new task.
 * - SuggestTaskOutput - The return type for the suggestTask function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestTaskOutputSchema = z.object({
  task: z.string().describe('A creative and interesting task suggestion.'),
});
export type SuggestTaskOutput = z.infer<typeof SuggestTaskOutputSchema>;

const prompt = ai.definePrompt({
  name: 'suggestTaskPrompt',
  output: { schema: SuggestTaskOutputSchema },
  prompt: `You are a creative assistant. Suggest a unique and interesting to-do item. It could be something fun, a small act of kindness, or a personal growth challenge. Make it concise and actionable.`,
});

export const suggestTaskFlow = ai.defineFlow(
  {
    name: 'suggestTaskFlow',
    outputSchema: SuggestTaskOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
