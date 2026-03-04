import React from 'react';
import { CALCULATOR_BUTTONS } from '../constants';
import { KeypadButton } from '../types';

interface CalculatorProps {
  onInput: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onCalculate: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onInput, onClear, onDelete, onCalculate }) => {
  
  const handlePress = (btn: KeypadButton) => {
    if (btn.value === 'clear') {
      onClear();
    } else if (btn.value === 'backspace') {
      onDelete();
    } else if (btn.value === '=') {
      onCalculate();
    } else {
      onInput(btn.value);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2 px-3 pb-3 pt-6 bg-gray-900 rounded-2xl shadow-inner border border-gray-800">
      {CALCULATOR_BUTTONS.map((btn) => (
        <button
          key={btn.label}
          onClick={() => handlePress(btn)}
          className={`
            h-12 w-full rounded-xl text-lg font-semibold transition-all duration-150 active:scale-95
            flex items-center justify-center shadow-lg
            ${btn.value === '=' 
              ? 'bg-neon-blue text-gray-900 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]' 
              : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}
            ${btn.className || ''}
          `}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default Calculator;