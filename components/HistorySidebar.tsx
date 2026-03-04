import React from 'react';
import { HistoryItem } from '../types';

interface HistorySidebarProps {
  history: HistoryItem[];
  isOpen: boolean;
  onClose: () => void;
  onClearHistory: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, isOpen, onClose, onClearHistory }) => {
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-gray-900 border-l border-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-blue"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            History
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">No history yet.</p>
          ) : (
            history.map((item) => (
              <div key={item.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700 relative group">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-blue-900 text-blue-200">
                    {item.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <div className="text-gray-400 text-sm break-words mb-1 font-mono">{item.expression}</div>
                <div className="text-neon-green text-lg font-bold text-right break-all">{item.result}</div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={onClearHistory}
            className="w-full py-2 text-sm text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            Clear History
          </button>
        </div>
      </div>
    </>
  );
};

export default HistorySidebar;