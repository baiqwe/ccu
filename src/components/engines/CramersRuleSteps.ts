import { Fraction } from './Fraction';
import { Step } from './InverseSteps';

export interface CramersRuleResult {
  solution: { [key: string]: Fraction };
  steps: Step[];
  hasSolution: boolean;
}

// Calculate determinant (reuse from InverseSteps logic)
function calculateDeterminant(matrix: Fraction[][]): Fraction {
  const n = matrix.length;
  
  if (n === 1) {
    return matrix[0][0];
  }
  
  if (n === 2) {
    return matrix[0][0].multiply(matrix[1][1]).subtract(matrix[0][1].multiply(matrix[1][0]));
  }
  
  let det = new Fraction(0, 1);
  for (let j = 0; j < n; j++) {
    const minor = getMinor(matrix, 0, j);
    const minorDet = calculateDeterminant(minor);
    const sign = j % 2 === 0 ? 1 : -1;
    det = det.add(new Fraction(sign * matrix[0][j].numerator, matrix[0][j].denominator).multiply(minorDet));
  }
  
  return det;
}

function getMinor(matrix: Fraction[][], row: number, col: number): Fraction[][] {
  const n = matrix.length;
  const minor: Fraction[][] = [];
  for (let i = 0; i < n; i++) {
    if (i === row) continue;
    const minorRow: Fraction[] = [];
    for (let j = 0; j < n; j++) {
      if (j === col) continue;
      minorRow.push(matrix[i][j].clone());
    }
    minor.push(minorRow);
  }
  return minor;
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

// Replace column i in matrix with constants
function replaceColumn(matrix: Fraction[][], columnIndex: number, constants: Fraction[]): Fraction[][] {
  const result: Fraction[][] = matrix.map((row, i) => {
    const newRow = [...row];
    newRow[columnIndex] = constants[i];
    return newRow;
  });
  return result;
}

export function calculateCramersRule(
  coefficients: number[][],
  constants: number[]
): CramersRuleResult {
  const n = coefficients.length;
  const steps: Step[] = [];
  
  // Convert to fractions
  const fractionCoeffs: Fraction[][] = coefficients.map(row =>
    row.map(val => Fraction.fromNumber(val))
  );
  const fractionConstants: Fraction[] = constants.map(val => Fraction.fromNumber(val));
  
  steps.push({
    title: 'Step 1: Calculate Determinant D',
    description: 'Find the determinant of the coefficient matrix A.',
    latex: `D = \\det(A) = \\det${matrixToLatex(fractionCoeffs)}`
  });
  
  const detD = calculateDeterminant(fractionCoeffs);
  
  steps.push({
    title: 'Step 2: Determinant D Result',
    description: `The determinant of the coefficient matrix is ${detD.toLatex()}.`,
    latex: `D = ${detD.toLatex()}`
  });
  
  if (detD.isZero()) {
    return {
      solution: {},
      steps,
      hasSolution: false
    };
  }
  
  const solution: { [key: string]: Fraction } = {};
  
  // Calculate Dx, Dy, Dz, etc.
  for (let i = 0; i < n; i++) {
    const varName = String.fromCharCode(120 + i); // x, y, z, ...
    const matrixDi = replaceColumn(fractionCoeffs, i, fractionConstants);
    
    steps.push({
      title: `Step ${3 + i}: Calculate D${varName}`,
      description: `Replace column ${i + 1} in matrix A with the constants vector to form D${varName}.`,
      latex: `D${varName} = \\det${matrixToLatex(matrixDi)}`
    });
    
    const detDi = calculateDeterminant(matrixDi);
    
    steps.push({
      title: `Step ${3 + i + 0.5}: D${varName} Result`,
      description: `The determinant D${varName} = ${detDi.toLatex()}.`,
      latex: `D${varName} = ${detDi.toLatex()}`
    });
    
    // Calculate solution: x = Dx / D
    const oneOverD = new Fraction(detD.denominator, detD.numerator);
    solution[varName] = detDi.multiply(oneOverD);
  }
  
  steps.push({
    title: `Step ${3 + n}: Apply Cramer's Rule`,
    description: 'Use Cramer\'s rule: each variable equals its determinant divided by D.',
    latex: Object.entries(solution).map(([k, v]) => `${k} = \\frac{D${k}}{D} = ${v.toLatex()}`).join(', \\quad ')
  });
  
  return {
    solution,
    steps,
    hasSolution: true
  };
}

