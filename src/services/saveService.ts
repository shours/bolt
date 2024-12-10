import axios from 'axios';
import { SaveAnalysisData } from '../types/analysis';

const SAVE_WEBHOOK_URL = 'https://hook.eu2.make.com/o4fy8bpq5l6qognoutx4sfxrvgub2kel';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const saveAnalysis = async (data: SaveAnalysisData): Promise<void> => {
  if (!data.serpamicsId || !data.content || !data.keyword) {
    throw new Error('Missing required data for saving');
  }

  try {
    const payload = {
      Result: data.content,
      'Mot clef': data.keyword,
      'data: guide: id': data.serpamicsId,
      'unique_id': data.uniqueId,
      langue: data.language || 'en'
    };

    const response = await api.post(SAVE_WEBHOOK_URL, payload);
    
    if (!response.data || response.status !== 200) {
      throw new Error('Invalid response from save webhook');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Network error during save: ${error.message}`);
    }
    throw error instanceof Error 
      ? error 
      : new Error('Failed to save analysis');
  }
};