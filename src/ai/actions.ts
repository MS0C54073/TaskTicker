'use server';

import { suggestTaskFlow } from '@/ai/flows/suggest-task-flow';

export async function suggestTaskAction() {
  return await suggestTaskFlow();
}
