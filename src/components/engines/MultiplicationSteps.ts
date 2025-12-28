import { Fraction } from './Fraction';
import { Step } from './InverseSteps';

export interface MultiplicationResult {
  result: Fraction[][];
  steps: Step[];
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

function multiplyMatrices(matrixA: Fraction[][], matrixB: Fraction[][]): Fraction[][] {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;

  const result: Fraction[][] = [];

  for (let i = 0; i < rowsA; i++) {
    result[i] = [];
    for (let j = 0; j < colsB; j++) {
      let sum = new Fraction(0, 1);
      for (let k = 0; k < colsA; k++) {
        sum = sum.add(matrixA[i][k].multiply(matrixB[k][j]));
      }
      result[i][j] = sum;
    }
  }

  return result;
}

export function getMultiplicationSteps(matrixA: Fraction[][], matrixB: Fraction[][]): MultiplicationResult {
  const steps: Step[] = [];
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;

  steps.push({
    title: 'Step 1: Verify Matrix Dimensions',
    description: `Matrix A is ${rowsA}×${colsA} and Matrix B is ${matrixB.length}×${colsB}. For multiplication, the number of columns in A must equal the number of rows in B.`,
    latex: `A = ${matrixToLatex(matrixA)}, \\quad B = ${matrixToLatex(matrixB)}`
  });

  const result = multiplyMatrices(matrixA, matrixB);

  steps.push({
    title: 'Step 2: Multiply Row by Column',
    description: 'Each element in the result matrix is the dot product of a row from the first matrix and a column from the second matrix.',
    latex: `C_{ij} = \\sum_{k=1}^{${colsA}} A_{ik} \\times B_{kj}`
  });

  steps.push({
    title: 'Step 3: Calculate Result',
    description: 'Compute each element of the resulting matrix.',
    latex: `A \\times B = ${matrixToLatex(result)}`
  });

  return {
    result,
    steps
  };
}

export function calculateMultiplication(matrixA: number[][], matrixB: number[][]): MultiplicationResult {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const colsB = matrixB[0].length;

  const fractionMatrixA: Fraction[][] = [];
  const fractionMatrixB: Fraction[][] = [];

  for (let i = 0; i < rowsA; i++) {
    fractionMatrixA[i] = [];
    for (let j = 0; j < colsA; j++) {
      fractionMatrixA[i][j] = Fraction.fromNumber(matrixA[i][j]);
    }
  }

  for (let i = 0; i < rowsB; i++) {
    fractionMatrixB[i] = [];
    for (let j = 0; j < colsB; j++) {
      fractionMatrixB[i][j] = Fraction.fromNumber(matrixB[i][j]);
    }
  }

  return getMultiplicationSteps(fractionMatrixA, fractionMatrixB);
}
