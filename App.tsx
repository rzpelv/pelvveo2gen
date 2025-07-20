
import React, { useState, useCallback } from 'react';
import { generateDetailedPrompt } from './services/geminiService';
import { Header } from './components/Header';
import { Spinner } from './components/Spinner';
import { MagicWandIcon, PlayIcon, VideoIcon } from './components/icons';

const App: React.FC = () => {
  const [idea, setIdea] = useState<string>('');
  const [detailedPrompt, setDetailedPrompt] = useState<string>('');
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEnhancePrompt = useCallback(async () => {
    if (!idea.trim() || isEnhancing) return;

    setIsEnhancing(true);
    setError(null);
    setVideoUrl(null);

    try {
      const result = await generateDetailedPrompt(idea);
      setDetailedPrompt(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsEnhancing(false);
    }
  }, [idea, isEnhancing]);

  const handleGenerateVideo = useCallback(() => {
    if (!detailedPrompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);

    // Simulate video generation with a delay
    setTimeout(() => {
      // Use a unique seed for a different image each time
      const seed = Date.now();
      setVideoUrl(`https://picsum.photos/seed/${seed}/1280/720`);
      setIsGenerating(false);
    }, 4000);
  }, [detailedPrompt, isGenerating]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          
          {/* Step 1: Idea Input */}
          <div className="bg-slate-800/50 rounded-2xl p-6 shadow-2xl backdrop-blur-lg border border-slate-700 transition-all duration-300 hover:border-indigo-500/50">
            <label htmlFor="idea-input" className="block text-sm font-semibold text-indigo-300 mb-2">
              STEP 1: DESCRIBE YOUR VIDEO IDEA
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                id="idea-input"
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g., a corgi exploring a magical forest"
                className="flex-grow bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                disabled={isEnhancing}
              />
              <button
                onClick={handleEnhancePrompt}
                disabled={!idea.trim() || isEnhancing}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
              >
                {isEnhancing ? (
                  <>
                    <Spinner /> Enhancing...
                  </>
                ) : (
                  <>
                    <MagicWandIcon className="w-5 h-5" /> Enhance Prompt
                  </>
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Step 2: Detailed Prompt & Generation */}
          <div 
             className={`bg-slate-800/50 rounded-2xl p-6 shadow-2xl backdrop-blur-lg border border-slate-700 transition-all duration-500 ${
                detailedPrompt ? 'opacity-100' : 'opacity-50'
             }`}
          >
             <label htmlFor="detailed-prompt-textarea" className="block text-sm font-semibold text-indigo-300 mb-2">
              STEP 2: REVIEW & GENERATE
            </label>
            <textarea
              id="detailed-prompt-textarea"
              value={detailedPrompt}
              onChange={(e) => setDetailedPrompt(e.target.value)}
              placeholder="Your enhanced prompt will appear here..."
              rows={6}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
              readOnly={!detailedPrompt}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleGenerateVideo}
                disabled={!detailedPrompt.trim() || isGenerating}
                className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
              >
                {isGenerating ? (
                  <>
                    <Spinner /> Generating...
                  </>
                ) : (
                  <>
                    <VideoIcon className="w-5 h-5" /> Generate Video
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Step 3: Video Display */}
          <div className="bg-slate-800/50 rounded-2xl aspect-video w-full flex items-center justify-center shadow-2xl backdrop-blur-lg border border-slate-700 overflow-hidden">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-4 text-slate-300">
                <Spinner size="lg" />
                <p className="text-lg animate-pulse">Generating your masterpiece...</p>
              </div>
            ) : videoUrl ? (
              <div className="relative w-full h-full group">
                <img src={videoUrl} alt="Generated video scene" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayIcon className="w-24 h-24 text-white/80" />
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <VideoIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <h3 className="text-xl font-semibold">Your video will appear here</h3>
                <p>Start by describing an idea above.</p>
              </div>
            )}
          </div>

        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Google Gemini & React. Video generation is simulated.</p>
      </footer>
    </div>
  );
};

export default App;
