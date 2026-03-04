import React, { useState, useRef } from 'react';
import { CalculatorMode, HistoryItem, MathResponse } from './types';
import Calculator from './components/Calculator';
import AIInterface from './components/AIInterface';
import HistorySidebar from './components/HistorySidebar';
import SplashScreen from './components/SplashScreen';
import { solveWithGemini } from './services/geminiService';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [mode, setMode] = useState<CalculatorMode>(CalculatorMode.STANDARD);
  const [input, setInput] = useState('');
  const [displayResult, setDisplayResult] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);

  // Focus utility
  const displayRef = useRef<HTMLDivElement>(null);

  const handleStandardInput = (val: string) => {
    // If we just calculated a result and type a number, reset.
    // If operator, continue with result.
    if (displayResult && !['+', '-', '*', '/'].includes(val)) {
        setInput(val);
        setDisplayResult('');
        setAiReasoning(null);
    } else if (displayResult && ['+', '-', '*', '/'].includes(val)) {
        setInput(displayResult + val);
        setDisplayResult('');
        setAiReasoning(null);
    } else {
        setInput((prev) => prev + val);
    }
  };

  const clearInput = () => {
    setInput('');
    setDisplayResult('');
    setAiReasoning(null);
  };

  const deleteLastChar = () => {
    if (displayResult) {
        clearInput();
    } else {
        setInput((prev) => prev.slice(0, -1));
    }
  };

  const addToHistory = (expression: string, result: string, type: CalculatorMode, details?: string[]) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      expression,
      result,
      type,
      timestamp: Date.now(),
      details
    };
    setHistory((prev) => [newItem, ...prev]);
  };

  const calculateStandard = () => {
    if (!input) return;
    try {
      // Basic safety check: only allow numbers and mathematical operators
      const sanitized = input.replace(/[^0-9+\-*/().]/g, '');
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + sanitized)();
      
      // Check for infinity or NaN
      if (!isFinite(result) || isNaN(result)) {
        setDisplayResult('Error');
        return;
      }

      const formattedResult = String(Number(result.toFixed(8))); // Remove trailing zeros
      setDisplayResult(formattedResult);
      addToHistory(input, formattedResult, CalculatorMode.STANDARD);
    } catch (e) {
      setDisplayResult('Error');
    }
  };

  const handleAISubmit = async (prompt: string) => {
    setAiLoading(true);
    setAiReasoning(null); // Clear previous reasoning
    setDisplayResult('Thinking...');
    
    // Switch to AI mode visual context if not already
    setMode(CalculatorMode.AI);

    const response: MathResponse = await solveWithGemini(prompt);

    setAiLoading(false);
    setDisplayResult(response.answer);
    setAiReasoning(response.reasoning);
    addToHistory(prompt, response.answer, CalculatorMode.AI, response.steps);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center p-4 font-sans selection:bg-neon-blue selection:text-black">
        
        {/* Background Ambience */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className={`w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col transition-all duration-300 max-h-[90vh] ${mode === CalculatorMode.AI ? 'h-[800px]' : 'h-[600px]'}`}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/50">
             <div className="flex items-center gap-2">
               <div className={`w-3 h-3 rounded-full ${mode === CalculatorMode.AI ? 'bg-neon-purple animate-pulse' : 'bg-neon-blue'}`}></div>
               <span className="font-bold tracking-wider text-gray-200">MATH<span className="text-gray-500">MIND</span></span>
             </div>
             
             <button 
               onClick={() => setIsHistoryOpen(true)}
               className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
             </button>
          </div>

          {/* Mode Toggle Tabs - Compact & High Visibility */}
          <div className="px-4 pt-4 z-20 relative">
            <div className="bg-gray-800 rounded-xl p-1 flex relative border border-gray-700 shadow-lg">
              {/* Sliding background with dynamic color */}
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg shadow-md transition-all duration-300 ease-out
                  ${mode === CalculatorMode.AI 
                    ? 'translate-x-[100%] ml-1 bg-neon-purple' 
                    : 'translate-x-0 bg-neon-blue'}`}
              ></div>
              
              <button 
                onClick={() => setMode(CalculatorMode.STANDARD)}
                className={`flex-1 relative z-10 py-1 text-xs font-bold rounded-lg transition-colors text-center 
                  ${mode === CalculatorMode.STANDARD ? 'text-gray-900' : 'text-gray-400 hover:text-gray-200'}`}
              >
                Standard
              </button>
              <button 
                onClick={() => setMode(CalculatorMode.AI)}
                className={`flex-1 relative z-10 py-1 text-xs font-bold rounded-lg transition-colors text-center flex items-center justify-center gap-2 
                  ${mode === CalculatorMode.AI ? 'text-gray-900' : 'text-gray-400 hover:text-gray-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                AI Solver
              </button>
            </div>
          </div>

          {/* Display Area */}
          <div 
              ref={displayRef}
              className={`flex-shrink-0 px-6 pb-6 pt-4 flex flex-col justify-end text-right transition-all duration-300 ${mode === CalculatorMode.AI ? 'h-48' : 'h-40'}`}
          >
            {/* Input Echo */}
            <div className="text-gray-400 text-lg mb-2 font-mono break-words h-12 overflow-hidden text-ellipsis opacity-75">
               {mode === CalculatorMode.STANDARD ? input : (aiLoading ? 'Analyzing...' : '')}
            </div>
            
            {/* Main Result */}
            <div className={`font-mono font-bold text-white break-all leading-none transition-all ${displayResult.length > 10 ? 'text-4xl' : 'text-6xl'} ${displayResult === 'Thinking...' ? 'animate-pulse text-neon-purple' : ''}`}>
               {displayResult || '0'}
            </div>

            {/* AI Reasoning Text (Brief) */}
            {mode === CalculatorMode.AI && aiReasoning && (
               <div className="mt-2 text-sm text-neon-purple font-medium text-left border-l-2 border-neon-purple pl-2 line-clamp-2">
                 {aiReasoning}
               </div>
            )}
          </div>

          {/* Dynamic Content Area */}
          <div className="flex-1 bg-gray-900 overflow-hidden relative border-t border-gray-800">
              {mode === CalculatorMode.STANDARD ? (
                  <div className="h-full flex flex-col justify-end">
                      <Calculator 
                          onInput={handleStandardInput}
                          onClear={clearInput}
                          onDelete={deleteLastChar}
                          onCalculate={calculateStandard}
                      />
                  </div>
              ) : (
                  <AIInterface onSubmit={handleAISubmit} isLoading={aiLoading} />
              )}
          </div>

          {/* History Sidebar */}
          <HistorySidebar 
              history={history}
              isOpen={isHistoryOpen}
              onClose={() => setIsHistoryOpen(false)}
              onClearHistory={() => setHistory([])}
          />

        </div>
      </div>
    </>
  );
};

export default App;