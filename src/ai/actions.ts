'use server';

import { suggestTaskFlow } from '@/ai/flows/suggest-task-flow';
import { translateFlow, type TranslateInput } from '@/ai/flows/translate-flow';

export async function suggestTaskAction() {
  return await suggestTaskFlow();
}

export async function translateAction(input: TranslateInput) {
  return await translateFlow(input);
}
