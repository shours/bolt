import axios from 'axios';

const WRITING_SAVE_WEBHOOK_URL = 'https://hook.eu2.make.com/h595mjr1y8s6knsigeumhni14g2753o1';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

interface WritingSaveData {
  content: string;
  serpamicsId: string;
  uniqueId?: string;
}

export const saveWriting = async (data: WritingSaveData): Promise<void> => {
  try {
    const response = await api.post(WRITING_SAVE_WEBHOOK_URL, {
      content: data.content,
      serpamicsId: data.serpamicsId,
      unique_id: data.uniqueId
    });
    
    if (!response.data || response.status !== 200) {
      throw new Error('Invalid response from save webhook');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Network error during save: ${error.message}`);
    }
    throw error instanceof Error 
      ? error 
      : new Error('Failed to save writing');
  }
};