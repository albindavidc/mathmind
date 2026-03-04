import { KeypadButton } from './types';

export const CALCULATOR_BUTTONS: KeypadButton[] = [
  { label: 'C', value: 'clear', type: 'action', className: 'text-red-400' },
  { label: '(', value: '(', type: 'scientific' },
  { label: ')', value: ')', type: 'scientific' },
  { label: '÷', value: '/', type: 'operator', className: 'text-neon-blue' },
  
  { label: '7', value: '7', type: 'number' },
  { label: '8', value: '8', type: 'number' },
  { label: '9', value: '9', type: 'number' },
  { label: '×', value: '*', type: 'operator', className: 'text-neon-blue' },
  
  { label: '4', value: '4', type: 'number' },
  { label: '5', value: '5', type: 'number' },
  { label: '6', value: '6', type: 'number' },
  { label: '-', value: '-', type: 'operator', className: 'text-neon-blue' },
  
  { label: '1', value: '1', type: 'number' },
  { label: '2', value: '2', type: 'number' },
  { label: '3', value: '3', type: 'number' },
  { label: '+', value: '+', type: 'operator', className: 'text-neon-blue' },
  
  { label: '.', value: '.', type: 'number' },
  { label: '0', value: '0', type: 'number' },
  { label: '⌫', value: 'backspace', type: 'action' },
  { label: '=', value: '=', type: 'action', className: 'bg-neon-blue text-black font-bold' },
];