'use client';

import React, { useState, useRef, useEffect } from 'react';

interface MatrixInputProps {
  rows: number;
  columns: number;
  values: number[][];
  onChange: (values: number[][]) => void;
  readOnly?: boolean;
}

export const MatrixInput: React.FC<MatrixInputProps> = ({
  rows,
  columns,
  values,
  onChange,
  readOnly = false
}) => {
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  useEffect(() => {
    inputRefs.current = Array(rows).fill(null).map(() => Array(columns).fill(null));
  }, [rows, columns]);

  const handleCellChange = (row: number, col: number, value: string) => {
    const newValues = values.map(r => [...r]);
    const numValue = value === '' ? 0 : parseFloat(value);
    newValues[row][col] = isNaN(numValue) ? 0 : numValue;
    onChange(newValues);
  };

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (e.key === 'Enter' || e.key === 'ArrowRight') {
      e.preventDefault();
      moveToNextCell(row, col);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveToPrevCell(row, col);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveToNextRow(row, col);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveToPrevRow(row, col);
    }
  };

  const moveToNextCell = (row: number, col: number) => {
    if (col < columns - 1) {
      inputRefs.current[row]?.[col + 1]?.focus();
    } else if (row < rows - 1) {
      inputRefs.current[row + 1]?.[0]?.focus();
    }
  };

  const moveToPrevCell = (row: number, col: number) => {
    if (col > 0) {
      inputRefs.current[row]?.[col - 1]?.focus();
    } else if (row > 0) {
      inputRefs.current[row - 1]?.[columns - 1]?.focus();
    }
  };

  const moveToNextRow = (row: number, col: number) => {
    if (row < rows - 1) {
      inputRefs.current[row + 1]?.[col]?.focus();
    }
  };

  const moveToPrevRow = (row: number, col: number) => {
    if (row > 0) {
      inputRefs.current[row - 1]?.[col]?.focus();
    }
  };

  return (
    <div className="inline-block bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex items-center">
        <div className="text-4xl font-light text-gray-400 mr-4">[</div>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {values.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                ref={el => {
                  if (inputRefs.current[rowIndex]) {
                    inputRefs.current[rowIndex][colIndex] = el;
                  }
                }}
                type="text"
                inputMode="none"
                readOnly={readOnly}
                value={value === 0 ? '' : value}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                onFocus={() => setFocusedCell({ row: rowIndex, col: colIndex })}
                onBlur={() => setFocusedCell(null)}
                className="w-16 h-12 text-center bg-white border-2 border-gray-300 rounded focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-purple-50 text-gray-900 transition-all placeholder:text-gray-400"
                placeholder="0"
              />
            ))
          )}
        </div>
        <div className="text-4xl font-light text-gray-400 ml-4">]</div>
      </div>
    </div>
  );
};
