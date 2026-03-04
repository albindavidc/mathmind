export enum CalculatorMode {
  STANDARD = 'STANDARD'
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  type: CalculatorMode;
  timestamp: number;
}

export interface KeypadButton {
  label: string;
  value: string;
  type: 'number' | 'operator' | 'action' | 'scientific';
  className?: string;
}