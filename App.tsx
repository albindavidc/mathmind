import React, { useState, useRef } from 'react';
import { CalculatorMode, HistoryItem } from './types';
import Calculator from './components/Calculator';
import HistorySidebar from './components/HistorySidebar';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [input, setInput] = useState('');
  const [displayResult, setDisplayResult] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Focus utility
  const displayRef = useRef<HTMLDivElement>(null);

  const handleStandardInput = (val: string) => {
    // If we just calculated a result and type a number, reset.
    // If operator, continue with result.
    if (displayResult && !['+', '-', '*', '/'].includes(val)) {
        setInput(val);
        setDisplayResult('');
    } else if (displayResult && ['+', '-', '*', '/'].includes(val)) {
        setInput(displayResult + val);
        setDisplayResult('');
    } else {
        setInput((prev) => prev + val);
    }
  };

  const clearInput = () => {
    setInput('');
    setDisplayResult('');
  };

  const deleteLastChar = () => {
    if (displayResult) {
        clearInput();
    } else {
        setInput((prev) => prev.slice(0, -1));
    }
  };

  const addToHistory = (expression: string, result: string, type: CalculatorMode) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      expression,
      result,
      type,
      timestamp: Date.now()
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

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center p-4 font-sans selection:bg-neon-blue selection:text-black">
        
        {/* Background Ambience */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col transition-all duration-300 max-h-[90vh] h-[600px]">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/50">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
               <span className="font-bold tracking-wider text-gray-200">MATH<span className="text-gray-500">MIND</span></span>
             </div>
             
             <button 
               onClick={() => setIsHistoryOpen(true)}
               className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
             </button>
          </div>

          {/* Display Area */}
          <div 
              ref={displayRef}
              className="flex-shrink-0 px-6 pb-6 pt-4 flex flex-col justify-end text-right transition-all duration-300 h-40"
          >
            {/* Input Echo */}
            <div className="text-gray-400 text-lg mb-2 font-mono break-words h-12 overflow-hidden text-ellipsis opacity-75">
               {input}
            </div>
            
            {/* Main Result */}
            <div className={`font-mono font-bold text-white break-all leading-none transition-all ${displayResult.length > 10 ? 'text-4xl' : 'text-6xl'} ${displayResult === 'Thinking...' ? 'animate-pulse text-neon-purple' : ''}`}>
               {displayResult || '0'}
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="flex-1 bg-gray-900 overflow-hidden relative border-t border-gray-800">
              <div className="h-full flex flex-col justify-end">
                  <Calculator 
                      onInput={handleStandardInput}
                      onClear={clearInput}
                      onDelete={deleteLastChar}
                      onCalculate={calculateStandard}
                  />
              </div>
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