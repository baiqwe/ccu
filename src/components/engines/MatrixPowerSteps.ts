import { Fraction } from './Fraction';
import { Step } from './InverseSteps';
import { getMultiplicationSteps, MultiplicationResult } from './MultiplicationSteps';

export interface MatrixPowerResult {
  result: Fraction[][];
  steps: Step[];
  power: number;
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

export function calculateMatrixPower(
  matrix: number[][],
  power: number
): MatrixPowerResult {
  const steps: Step[] = [];
  
  // Convert to fractions
  const fractionMatrix: Fraction[][] = matrix.map(row =>
    row.map(val => Fraction.fromNumber(val))
  );
  
  if (power === 0) {
    // Identity matrix
    const identity: Fraction[][] = fractionMatrix.map((row, i) =>
      row.map((_, j) => new Fraction(i === j ? 1 : 0, 1))
    );
    steps.push({
      title: 'Step 1: Matrix to Power 0',
      description: 'Any matrix raised to the power of 0 equals the identity matrix.',
      latex: `A^0 = I = ${matrixToLatex(identity)}`
    });
    
    return {
      result: identity,
      steps,
      power: 0
    };
  }
  
  if (power === 1) {
    steps.push({
      title: 'Step 1: Matrix to Power 1',
      description: 'Any matrix raised to the power of 1 equals itself.',
      latex: `A^1 = A = ${matrixToLatex(fractionMatrix)}`
    });
    
    return {
      result: fractionMatrix,
      steps,
      power: 1
    };
  }
  
  steps.push({
    title: 'Step 1: Initialize',
    description: `We need to calculate A^${power} by multiplying A by itself ${power} times.`,
    latex: `A^${power} = A \\times A \\times \\cdots \\times A \\text{ (${power} times)}`
  });
  
  // Calculate power iteratively
  let result = fractionMatrix;
  let currentPower = 1;
  
  while (currentPower < power) {
    const multResult: MultiplicationResult = getMultiplicationSteps(result, fractionMatrix);
    result = multResult.result;
    currentPower++;
    
    steps.push({
      title: `Step ${currentPower}: Calculate A^${currentPower}`,
      description: `Multiply A^${currentPower - 1} by A to get A^${currentPower}.`,
      latex: `A^${currentPower} = A^${currentPower - 1} \\times A = ${matrixToLatex(result)}`
    });
    
    // Add sub-steps from multiplication
    if (multResult.steps.length > 0) {
      steps[steps.length - 1].subSteps = multResult.steps;
    }
  }
  
  return {
    result,
    steps,
    power
  };
}

