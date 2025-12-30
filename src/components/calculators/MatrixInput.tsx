'use client';

import React, { useState, useRef, useEffect } from 'react';

interface MatrixInputProps {
  rows: number;
  columns: number;
  values: number[][];
  onChange: (values: number[][]) => void;
  readOnly?: boolean;
  onFocus?: (row: number, col: number) => void;
  onBlur?: () => void;
  matrixId?: 'A' | 'B';
}

export const MatrixInput: React.FC<MatrixInputProps> = ({
  rows,
  columns,
  values,
  onChange,
  readOnly = false,
  onFocus,
  onBlur,
  matrixId
}) => {
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);
  const prevValuesRef = useRef<number[][]>(values);

  useEffect(() => {
    inputRefs.current = Array(rows).fill(null).map(() => Array(columns).fill(null));
    // Reset input values when matrix size changes
    setInputValues({});
  }, [rows, columns]);
  
  // Initialize input values from props when matrix size changes
  useEffect(() => {
    const newInputValues: { [key: string]: string } = {};
    values.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        const cellKey = `${rowIndex}-${colIndex}`;
        newInputValues[cellKey] = value === 0 ? '' : value.toString();
      });
    });
    setInputValues(newInputValues);
    prevValuesRef.current = values.map(r => [...r]);
  }, [rows, columns]); // Only reset when size changes
  
  // Detect external value changes (e.g., clear button) and reset input values
  useEffect(() => {
    const prevValues = prevValuesRef.current;
    // Check if all values were reset to 0 (likely from clear button)
    const allZero = values.every(row => row.every(v => v === 0));
    const prevAllZero = prevValues.every(row => row.every(v => v === 0));
    
    // If values changed from non-zero to all zero, reset input values
    if (!prevAllZero && allZero) {
      const newInputValues: { [key: string]: string } = {};
      values.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          const cellKey = `${rowIndex}-${colIndex}`;
          newInputValues[cellKey] = '';
        });
      });
      setInputValues(newInputValues);
    }
    
    prevValuesRef.current = values.map(r => [...r]);
  }, [values]);

  const handleCellChange = (row: number, col: number, value: string) => {
    // Store the raw input value for display
    const cellKey = `${row}-${col}`;
    setInputValues(prev => ({ ...prev, [cellKey]: value }));
    
    // Update the actual matrix values
    const newValues = values.map(r => [...r]);
    // Allow empty string, minus sign, and valid numbers
    let numValue: number;
    if (value === '' || value === '-') {
      numValue = 0;
    } else {
      const parsed = parseFloat(value);
      numValue = isNaN(parsed) ? 0 : parsed;
    }
    newValues[row][col] = numValue;
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
                inputMode={readOnly ? "none" : "decimal"}
                readOnly={readOnly}
                value={inputValues[`${rowIndex}-${colIndex}`] ?? (value === 0 ? '' : value.toString())}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                onFocus={() => {
                  setFocusedCell({ row: rowIndex, col: colIndex });
                  if (onFocus) {
                    onFocus(rowIndex, colIndex);
                  }
                }}
                onBlur={() => {
                  setFocusedCell(null);
                  if (onBlur) {
                    onBlur();
                  }
                }}
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
