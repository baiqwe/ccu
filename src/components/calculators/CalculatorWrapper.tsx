'use client';

import React, { useState, useEffect } from 'react';
import { MatrixInput } from './MatrixInput';
import { Keypad } from './Keypad';
import { StepViewer } from './StepViewer';
import { calculateInverse, InverseResult } from '../engines/InverseSteps';
import { calculateRREF, RREFResult } from '../engines/RREFSteps';
import { calculateMultiplication, MultiplicationResult } from '../engines/MultiplicationSteps';
import { useTranslations } from 'next-intl';

interface CalculatorWrapperProps {
  toolId: string;
}

export const CalculatorWrapper: React.FC<CalculatorWrapperProps> = ({ toolId }) => {
  const t = useTranslations('Common');
  const [matrixSize, setMatrixSize] = useState(3);
  const [matrixA, setMatrixA] = useState<number[][]>(() =>
    Array(matrixSize).fill(null).map(() => Array(matrixSize).fill(0))
  );
  const [matrixB, setMatrixB] = useState<number[][]>(() =>
    Array(matrixSize).fill(null).map(() => Array(matrixSize).fill(0))
  );
  const [result, setResult] = useState<any>(null);
  const [showKeypad, setShowKeypad] = useState(false);
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number; matrix: 'A' | 'B' } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setShowKeypad(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSizeChange = (size: number) => {
    setMatrixSize(size);
    setMatrixA(Array(size).fill(null).map(() => Array(size).fill(0)));
    setMatrixB(Array(size).fill(null).map(() => Array(size).fill(0)));
    setResult(null);
  };

  const handleCalculate = () => {
    switch (toolId) {
      case 'inverse':
        // Performance limit: Adjoint method with recursive determinant calculation
        // becomes too slow for matrices larger than 5x5 (O(n!) complexity)
        if (matrixSize > 5) {
          alert('For step-by-step solutions, inverse matrix calculator supports up to 5×5 matrices. For larger matrices, please use Gauss-Jordan elimination method.');
          return;
        }
        const inverseResult: InverseResult = calculateInverse(matrixA);
        setResult(inverseResult);
        break;
      case 'rref':
        const rrefResult: RREFResult = calculateRREF(matrixA);
        setResult(rrefResult);
        break;
      case 'multiplication':
        const multResult: MultiplicationResult = calculateMultiplication(matrixA, matrixB);
        setResult(multResult);
        break;
    }
  };

  const handleClear = () => {
    setMatrixA(Array(matrixSize).fill(null).map(() => Array(matrixSize).fill(0)));
    setMatrixB(Array(matrixSize).fill(null).map(() => Array(matrixSize).fill(0)));
    setResult(null);
  };

  const handleKeypadInput = (value: string) => {
    if (!focusedCell) return;

    const { row, col, matrix } = focusedCell;
    const currentMatrix = matrix === 'A' ? matrixA : matrixB;
    const currentValue = currentMatrix[row][col].toString();

    let newValue: string;
    if (value === '.' && currentValue.includes('.')) {
      newValue = currentValue;
    } else if (value === '-' && currentValue === '') {
      newValue = '-';
    } else if (value === '-' && currentValue.startsWith('-')) {
      newValue = currentValue.substring(1);
    } else if (currentValue === '0' && value !== '.') {
      newValue = value;
    } else {
      newValue = currentValue + value;
    }

    const numValue = parseFloat(newValue) || 0;
    if (matrix === 'A') {
      const newMatrix = matrixA.map(r => [...r]);
      newMatrix[row][col] = numValue;
      setMatrixA(newMatrix);
    } else {
      const newMatrix = matrixB.map(r => [...r]);
      newMatrix[row][col] = numValue;
      setMatrixB(newMatrix);
    }
  };

  const handleKeypadBackspace = () => {
    if (!focusedCell) return;

    const { row, col, matrix } = focusedCell;
    const currentMatrix = matrix === 'A' ? matrixA : matrixB;
    const currentValue = currentMatrix[row][col].toString();

    const newValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
    const numValue = parseFloat(newValue) || 0;

    if (matrix === 'A') {
      const newMatrix = matrixA.map(r => [...r]);
      newMatrix[row][col] = numValue;
      setMatrixA(newMatrix);
    } else {
      const newMatrix = matrixB.map(r => [...r]);
      newMatrix[row][col] = numValue;
      setMatrixB(newMatrix);
    }
  };

  const handleNextCell = () => {
    if (!focusedCell) return;

    const { row, col, matrix } = focusedCell;
    const size = matrix === 'A' ? matrixA.length : matrixB.length;

    if (col < size - 1) {
      setFocusedCell({ row, col: col + 1, matrix });
    } else if (row < size - 1) {
      setFocusedCell({ row: row + 1, col: 0, matrix });
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (toolId === 'inverse') {
      const inverseResult = result as InverseResult;
      if (!inverseResult.exists) {
        return (
          <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400">
            {t('Inverse.noInverse')}
          </div>
        );
      }
      return (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white mb-4">{t('result')}</h3>
          <MatrixInput
            rows={matrixSize}
            columns={matrixSize}
            values={inverseResult.inverse.map(row => row.map(f => f.toNumber()))}
            onChange={() => {}}
            readOnly
          />
        </div>
      );
    }

    if (toolId === 'rref') {
      const rrefResult = result as RREFResult;
      return (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white mb-4">{t('result')}</h3>
          <MatrixInput
            rows={rrefResult.rref.length}
            columns={rrefResult.rref[0].length}
            values={rrefResult.rref.map(row => row.map(f => f.toNumber()))}
            onChange={() => {}}
            readOnly
          />
        </div>
      );
    }

    if (toolId === 'multiplication') {
      const multResult = result as MultiplicationResult;
      return (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white mb-4">{t('result')}</h3>
          <MatrixInput
            rows={multResult.result.length}
            columns={multResult.result[0].length}
            values={multResult.result.map(row => row.map(f => f.toNumber()))}
            onChange={() => {}}
            readOnly
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
        <label className="text-zinc-300 font-medium">{t('matrixSize')}:</label>
        <div className="flex gap-2">
          {(() => {
            // Limit matrix sizes based on tool type
            // Inverse matrix: max 5x5 for step-by-step (performance)
            // Other tools: can support larger sizes
            const maxSize = toolId === 'inverse' ? 5 : 4;
            const sizes = [2, 3, 4];
            if (maxSize === 5) sizes.push(5);
            return sizes;
          })().map(size => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                matrixSize === size
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {size}×{size}
            </button>
          ))}
        </div>
        {toolId === 'inverse' && matrixSize === 5 && (
          <p className="text-sm text-amber-400 mt-2 w-full text-center">
            Note: Step-by-step solutions for 5×5 matrices may take longer to compute.
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-zinc-300 mb-4">Matrix A</h3>
          <MatrixInput
            rows={matrixSize}
            columns={matrixSize}
            values={matrixA}
            onChange={setMatrixA}
          />
        </div>

        {toolId === 'multiplication' && (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-zinc-300 mb-4">Matrix B</h3>
            <MatrixInput
              rows={matrixSize}
              columns={matrixSize}
              values={matrixB}
              onChange={setMatrixB}
            />
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleCalculate}
          className="bg-white text-black hover:bg-zinc-200 font-semibold py-3 px-8 rounded-lg transition-all"
        >
          {t('calculate')}
        </button>
        <button
          onClick={handleClear}
          className="bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 font-semibold py-3 px-8 rounded-lg transition-all"
        >
          {t('clear')}
        </button>
      </div>

      {renderResult()}

      {result && result.steps && (
        <StepViewer steps={result.steps} />
      )}

      {showKeypad && (
        <Keypad
          onInput={handleKeypadInput}
          onClear={handleClear}
          onBackspace={handleKeypadBackspace}
          onNextCell={handleNextCell}
        />
      )}
    </div>
  );
};
