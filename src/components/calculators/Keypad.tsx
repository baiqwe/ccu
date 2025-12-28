'use client';

import React from 'react';

interface KeypadProps {
  onInput: (value: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onNextCell: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({
  onInput,
  onClear,
  onBackspace,
  onNextCell
}) => {
  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', 'Back'],
    ['0', '.', 'Clear', 'Next']
  ];

  const handleButtonClick = (value: string) => {
    switch (value) {
      case 'Clear':
        onClear();
        break;
      case 'Back':
        onBackspace();
        break;
      case 'Next':
        onNextCell();
        break;
      default:
        onInput(value);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg md:hidden z-50">
      <div className="max-w-md mx-auto p-4">
        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(btn)}
              className={`
                h-14 text-lg font-semibold rounded-lg transition-all active:scale-95
                ${btn === 'Clear' ? 'bg-red-500 text-white hover:bg-red-600' : ''}
                ${btn === 'Back' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}
                ${btn === 'Next' ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                ${btn === '/' || btn === '-' ? 'bg-purple-500 text-white hover:bg-purple-600' : ''}
                ${['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(btn)
                  ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  : ''}
              `}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
