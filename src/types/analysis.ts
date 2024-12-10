export interface AnalysisFormData {
  keyword: string;
  language: string;
  searchEngine: string;
  audience: string;
  clientInfo: string;
  serpamicsId: string;
  projectId?: string;
}

export interface AnalysisResponse {
  content: string;
  serpamicsId: string;
  keyword: string;
  language: string;
  analysis: string;
  error?: string;
}

export interface SaveAnalysisData {
  serpamicsId: string;
  keyword: string;
  content: string;
  language?: string;
  projectId?: string;
  uniqueId?: string;
}

export interface AnalysisState {
  isLoading: boolean;
  error: string | null;
  result: string | null;
  analysis: string | null;
  isEditing: boolean;
  serpamicsId: string | null;
  keyword: string | null;
  language: string | null;
  uniqueId?: string;
}