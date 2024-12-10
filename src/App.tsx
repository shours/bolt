import React from 'react';
import { FileText } from 'lucide-react';
import AnalysisForm from './components/AnalysisForm';
import AnalysisResult from './components/AnalysisResult';
import WritingSection from './components/WritingSection';
import LoadingModal from './components/LoadingModal';
import LoginModal from './components/LoginModal';
import { useAnalysis } from './hooks/useAnalysis';
import { useWriting } from './hooks/useWriting';
import { useAuth } from './hooks/useAuth';
import Logo from './components/Logo';

function App() {
  const { state: analysisState, handleSubmit, handleEdit, handleSave } = useAnalysis();
  const { state: writingState, handleSubmit: handleWritingSubmit, handleEdit: handleWritingEdit, handleSave: handleWritingSave } = useWriting();
  const { state: authState, handleLogin } = useAuth();

  const handleWritingFormSubmit = async ({ persona, tone }: { persona: string; tone: string }) => {
    if (!analysisState.analysis || !analysisState.result || !analysisState.serpamicsId) return;
    
    await handleWritingSubmit(
      analysisState.analysis,
      analysisState.result,
      analysisState.serpamicsId,
      persona,
      tone,
      analysisState.uniqueId
    );
  };

  const handleWritingSaveWrapper = (content: string, serpamicsId: string) => {
    handleWritingSave(content, serpamicsId, analysisState.uniqueId);
  };

  if (!authState.isAuthenticated) {
    return (
      <LoginModal
        onSubmit={handleLogin}
        isLoading={authState.isLoading}
        error={authState.error}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <LoadingModal 
          isOpen={analysisState.isLoading || writingState.isLoading} 
          isWritingGeneration={writingState.isLoading}
        />
        
        <div className="flex items-center space-x-3 mb-8">
          <Logo />
        </div>

        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-pink-100 p-2 rounded">
            <FileText className="w-5 h-5 text-pink-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Brief de rédaction</h1>
        </div>

        <AnalysisForm 
          onSubmit={handleSubmit}
          isLoading={analysisState.isLoading}
        />

        {analysisState.error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{analysisState.error}</p>
          </div>
        )}

        {analysisState.result && !analysisState.isLoading && (
          <AnalysisResult
            content={analysisState.result}
            analysis={analysisState.analysis}
            isEditing={analysisState.isEditing}
            keyword={analysisState.keyword}
            language={analysisState.language}
            serpamicsId={analysisState.serpamicsId}
            onEdit={handleEdit}
            onSave={handleSave}
          />
        )}

        {analysisState.result && !analysisState.isLoading && (
          <WritingSection
            analysis={analysisState.analysis}
            brief={analysisState.result}
            serpamicsId={analysisState.serpamicsId}
            onSubmit={handleWritingFormSubmit}
            isLoading={writingState.isLoading}
            content={writingState.content}
            isEditing={writingState.isEditing}
            onEdit={handleWritingEdit}
            onSave={handleWritingSaveWrapper}
          />
        )}

        {writingState.error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{writingState.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;