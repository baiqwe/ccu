'use client';

import React, { useState, useEffect } from 'react';
import { MatrixInput } from './MatrixInput';
import { Keypad } from './Keypad';
import { StepViewer } from './StepViewer';
import { calculateInverse, InverseResult } from '../engines/InverseSteps';
import { calculateRREF, RREFResult } from '../engines/RREFSteps';
import { calculateMultiplication, MultiplicationResult } from '../engines/MultiplicationSteps';
import { calculateSystemEquations, SystemEquationsResult } from '../engines/SystemEquationsSteps';
import { calculateCramersRule, CramersRuleResult } from '../engines/CramersRuleSteps';
import { calculateMatrixPower, MatrixPowerResult } from '../engines/MatrixPowerSteps';
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
  const [constants, setConstants] = useState<number[]>(() => Array(matrixSize).fill(0)); // For system equations and Cramer's rule
  const [power, setPower] = useState<number>(2); // For matrix power
  const [result, setResult] = useState<any>(null);
  const [showKeypad, setShowKeypad] = useState(false);
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number; matrix: 'A' | 'B' | 'C' } | null>(null);

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
    setConstants(Array(size).fill(0));
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
      case 'system-equations':
        const systemResult: SystemEquationsResult = calculateSystemEquations(matrixA, constants);
        setResult(systemResult);
        break;
      case 'cramers-rule':
        const cramersResult: CramersRuleResult = calculateCramersRule(matrixA, constants);
        setResult(cramersResult);
        break;
      case 'matrix-power':
        if (power < 0 || !Number.isInteger(power)) {
          alert('Power must be a non-negative integer.');
          return;
        }
        const powerResult: MatrixPowerResult = calculateMatrixPower(matrixA, power);
        setResult(powerResult);
        break;
    }
  };

  const handleClear = () => {
    const emptyMatrix = Array(matrixSize).fill(null).map(() => Array(matrixSize).fill(0));
    setMatrixA(emptyMatrix);
    setMatrixB(emptyMatrix);
    setConstants(Array(matrixSize).fill(0));
    setResult(null);
    setFocusedCell(null); // Clear focus when clearing
  };

  const handleKeypadInput = (value: string) => {
    if (!focusedCell) return;

    const { row, col, matrix } = focusedCell;
    
    if (matrix === 'C') {
      // Handle constants vector
      const currentValue = constants[row].toString();
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
      const newConstants = [...constants];
      newConstants[row] = numValue;
      setConstants(newConstants);
      return;
    }
    
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
    
    if (matrix === 'C') {
      const currentValue = constants[row].toString();
      const newValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
      const numValue = parseFloat(newValue) || 0;
      const newConstants = [...constants];
      newConstants[row] = numValue;
      setConstants(newConstants);
      return;
    }
    
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
          <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-700">
            {t('Inverse.noInverse')}
          </div>
        );
      }
      return (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('result')}</h3>
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
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('result')}</h3>
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
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('result')}</h3>
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

    if (toolId === 'system-equations') {
      const systemResult = result as SystemEquationsResult;
      if (!systemResult.hasSolution) {
        return (
          <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-700">
            The system has no solution (inconsistent system).
          </div>
        );
      }
      if (systemResult.isInfinite) {
        return (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-700">
            The system has infinitely many solutions (free variables present).
          </div>
        );
      }
      return (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Solution</h3>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="space-y-2">
              {Object.entries(systemResult.solution).map(([varName, value]) => (
                <div key={varName} className="text-lg">
                  <span className="font-mono text-purple-600">{varName}</span>
                  {' = '}
                  <span className="font-mono text-gray-900">
                    {typeof value === 'string' ? value : value.toString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (toolId === 'cramers-rule') {
      const cramersResult = result as CramersRuleResult;
      if (!cramersResult.hasSolution) {
        return (
          <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-700">
            The system has no unique solution (determinant D = 0). Cramer&apos;s rule cannot be applied.
          </div>
        );
      }
      return (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Solution</h3>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="space-y-2">
              {Object.entries(cramersResult.solution).map(([varName, value]) => (
                <div key={varName} className="text-lg">
                  <span className="font-mono text-purple-600">{varName}</span>
                  {' = '}
                  <span className="font-mono text-gray-900">{value.toString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (toolId === 'matrix-power') {
      const powerResult = result as MatrixPowerResult;
      return (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Result: A^{powerResult.power}</h3>
          <MatrixInput
            rows={powerResult.result.length}
            columns={powerResult.result[0].length}
            values={powerResult.result.map(row => row.map(f => f.toNumber()))}
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
        <label className="text-gray-700 font-medium">{t('matrixSize')}:</label>
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
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {size}×{size}
            </button>
          ))}
        </div>
        {toolId === 'inverse' && matrixSize === 5 && (
          <p className="text-sm text-amber-600 mt-2 w-full text-center">
            Note: Step-by-step solutions for 5×5 matrices may take longer to compute.
          </p>
        )}
      </div>

      {/* Power input for matrix-power tool */}
      {toolId === 'matrix-power' && (
        <div className="flex items-center justify-center gap-4 mb-6">
          <label className="text-gray-700 font-medium">Power (n):</label>
          <input
            type="number"
            min="0"
            max="10"
            value={power}
            onChange={(e) => setPower(parseInt(e.target.value) || 2)}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {toolId === 'system-equations' || toolId === 'cramers-rule' ? 'Coefficient Matrix A' : 'Matrix A'}
          </h3>
          <MatrixInput
            rows={matrixSize}
            columns={matrixSize}
            values={matrixA}
            onChange={setMatrixA}
            onFocus={(row, col) => setFocusedCell({ row, col, matrix: 'A' })}
            onBlur={() => setFocusedCell(null)}
            matrixId="A"
          />
        </div>

        {toolId === 'multiplication' && (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Matrix B</h3>
            <MatrixInput
              rows={matrixSize}
              columns={matrixSize}
              values={matrixB}
              onChange={setMatrixB}
              onFocus={(row, col) => setFocusedCell({ row, col, matrix: 'B' })}
              onBlur={() => setFocusedCell(null)}
              matrixId="B"
            />
          </div>
        )}

        {(toolId === 'system-equations' || toolId === 'cramers-rule') && (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Constants Vector B</h3>
            <div className="inline-block bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="text-4xl font-light text-gray-400 mr-4">[</div>
                <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' }}>
                  {constants.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="decimal"
                      value={value === 0 ? '' : value}
                      onChange={(e) => {
                        const newConstants = [...constants];
                        const numValue = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        newConstants[index] = isNaN(numValue) ? 0 : numValue;
                        setConstants(newConstants);
                      }}
                      className="w-16 h-12 text-center bg-white border-2 border-gray-300 rounded focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-purple-50 text-gray-900 transition-all placeholder:text-gray-400"
                      placeholder="0"
                    />
                  ))}
                </div>
                <div className="text-4xl font-light text-gray-400 ml-4">]</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleCalculate}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 font-semibold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          {t('calculate')}
        </button>
        <button
          onClick={handleClear}
          className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 font-semibold py-3 px-8 rounded-lg transition-all"
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
