import { Fraction } from './Fraction';
import { Step } from './InverseSteps';
import { calculateRREF, RREFResult } from './RREFSteps';

export interface SystemEquationsResult {
  solution: { [key: string]: Fraction | string };
  steps: Step[];
  hasSolution: boolean;
  isInfinite: boolean;
}

// Convert system Ax = B to augmented matrix [A | B]
function createAugmentedMatrix(coefficients: Fraction[][], constants: Fraction[]): Fraction[][] {
  const rows = coefficients.length;
  const augmented: Fraction[][] = [];
  
  for (let i = 0; i < rows; i++) {
    augmented[i] = [...coefficients[i], constants[i]];
  }
  
  return augmented;
}

export function calculateSystemEquations(
  coefficients: number[][],
  constants: number[]
): SystemEquationsResult {
  const n = coefficients.length;
  const steps: Step[] = [];
  
  // Convert to fractions
  const fractionCoeffs: Fraction[][] = coefficients.map(row =>
    row.map(val => Fraction.fromNumber(val))
  );
  const fractionConstants: Fraction[] = constants.map(val => Fraction.fromNumber(val));
  
  // Create augmented matrix
  const augmented = createAugmentedMatrix(fractionCoeffs, fractionConstants);
  
  steps.push({
    title: 'Step 1: Write System as Augmented Matrix',
    description: 'Convert the system of equations Ax = B into an augmented matrix [A | B].',
    latex: `[A|B] = ${matrixToLatex(augmented)}`
  });
  
  // Use RREF to solve
  const rrefResult: RREFResult = calculateRREF(
    augmented.map(row => row.map(f => f.toNumber()))
  );
  
  // Extract solution from RREF (rrefResult.rref is already Fraction[][])
  const solution: { [key: string]: Fraction | string } = {};
  let hasSolution = true;
  let isInfinite = false;
  
  // Use RREF result directly (it's already Fraction[][])
  const rrefFraction: Fraction[][] = rrefResult.rref;
  
  // Check for inconsistent system (row of zeros with non-zero constant)
  for (let i = 0; i < rrefFraction.length; i++) {
    const row = rrefFraction[i];
    const allZero = row.slice(0, -1).every(f => f.isZero());
    const constant = row[row.length - 1];
    
    if (allZero && !constant.isZero()) {
      hasSolution = false;
      break;
    }
  }
  
  if (hasSolution) {
    // Extract solution from RREF
    const pivotCols: number[] = [];
    for (let i = 0; i < rrefFraction.length; i++) {
      for (let j = 0; j < rrefFraction[i].length - 1; j++) {
        if (!rrefFraction[i][j].isZero()) {
          pivotCols.push(j);
          break;
        }
      }
    }
    
    if (pivotCols.length < n) {
      isInfinite = true;
    }
    
    for (let i = 0; i < n; i++) {
      const varName = String.fromCharCode(120 + i); // x, y, z, ...
      if (pivotCols.includes(i)) {
        const rowIndex = pivotCols.indexOf(i);
        solution[varName] = rrefFraction[rowIndex][n];
      } else {
        solution[varName] = 'free';
      }
    }
  }
  
  steps.push({
    title: 'Step 2: Apply Gaussian Elimination',
    description: 'Use row operations to convert the augmented matrix to reduced row echelon form (RREF).',
    latex: rrefResult.steps.length > 0 ? rrefResult.steps[1]?.latex || '' : ''
  });
  
  steps.push({
    title: 'Step 3: Extract Solution',
    description: hasSolution 
      ? (isInfinite 
          ? 'The system has infinitely many solutions (free variables present).'
          : 'Read the solution directly from the RREF matrix.')
      : 'The system has no solution (inconsistent).',
    latex: hasSolution 
      ? `\\text{Solution: } ${Object.entries(solution).map(([k, v]) => `${k} = ${typeof v === 'string' ? v : v.toLatex()}`).join(', ')}`
      : '\\text{No solution exists}'
  });
  
  return {
    solution,
    steps: [...steps, ...rrefResult.steps.slice(1)],
    hasSolution,
    isInfinite
  };
}

function matrixToLatex(matrix: Fraction[][]): string {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let latex = '\\begin{pmatrix}';
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      latex += matrix[i][j].toLatex();
      if (j < cols - 1) latex += ' & ';
    }
    if (i < rows - 1) latex += ' \\\\ ';
  }
  
  latex += '\\end{pmatrix}';
  return latex;
}

