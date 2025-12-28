import { Fraction } from './Fraction';
import { Step } from './InverseSteps';

export interface RREFResult {
  rref: Fraction[][];
  steps: Step[];
}

interface RowOperation {
  type: 'swap' | 'scale' | 'add';
  row1: number;
  row2?: number;
  scalar?: Fraction;
  description: string;
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

function findPivot(matrix: Fraction[][], row: number, col: number): number {
  const rows = matrix.length;
  for (let i = row; i < rows; i++) {
    if (!matrix[i][col].isZero()) {
      return i;
    }
  }
  return -1;
}

function swapRows(matrix: Fraction[][], row1: number, row2: number): void {
  const temp = matrix[row1];
  matrix[row1] = matrix[row2];
  matrix[row2] = temp;
}

function scaleRow(matrix: Fraction[][], row: number, scalar: Fraction): void {
  const cols = matrix[row].length;
  for (let j = 0; j < cols; j++) {
    matrix[row][j] = matrix[row][j].multiply(scalar);
  }
}

function addScaledRow(matrix: Fraction[][], targetRow: number, sourceRow: number, scalar: Fraction): void {
  const cols = matrix[targetRow].length;
  for (let j = 0; j < cols; j++) {
    matrix[targetRow][j] = matrix[targetRow][j].add(matrix[sourceRow][j].multiply(scalar));
  }
}

function cloneMatrix(matrix: Fraction[][]): Fraction[][] {
  return matrix.map(row => row.map(f => f.clone()));
}

export function getRREFSteps(matrix: Fraction[][]): RREFResult {
  const steps: Step[] = [];
  const operations: RowOperation[] = [];
  const result = cloneMatrix(matrix);

  const rows = result.length;
  const cols = result[0].length;

  steps.push({
    title: 'Step 1: Create Augmented Matrix',
    description: 'Write the system as an augmented matrix.',
    latex: `A = ${matrixToLatex(result)}`
  });

  let currentRow = 0;
  let currentCol = 0;

  while (currentRow < rows && currentCol < cols) {
    const pivotRow = findPivot(result, currentRow, currentCol);

    if (pivotRow === -1) {
      currentCol++;
      continue;
    }

    if (pivotRow !== currentRow) {
      swapRows(result, currentRow, pivotRow);
      operations.push({
        type: 'swap',
        row1: currentRow,
        row2: pivotRow,
        description: `Swap R${currentRow + 1} and R${pivotRow + 1}`
      });
    }

    const pivot = result[currentRow][currentCol];
    if (!pivot.equals(new Fraction(1, 1))) {
      const scalar = new Fraction(pivot.denominator, pivot.numerator);
      scaleRow(result, currentRow, scalar);
      operations.push({
        type: 'scale',
        row1: currentRow,
        scalar: scalar,
        description: `Multiply R${currentRow + 1} by ${scalar.toLatex()}`
      });
    }

    for (let i = 0; i < rows; i++) {
      if (i !== currentRow && !result[i][currentCol].isZero()) {
        const scalar = result[i][currentCol].negate();
        addScaledRow(result, i, currentRow, scalar);
        operations.push({
          type: 'add',
          row1: i,
          row2: currentRow,
          scalar: scalar,
          description: `R${i + 1} = R${i + 1} + (${scalar.toLatex()}) × R${currentRow + 1}`
        });
      }
    }

    currentRow++;
    currentCol++;
  }

  steps.push({
    title: 'Step 2: Row Operations',
    description: 'Apply Gaussian-Jordan elimination to get reduced row echelon form.',
    latex: operations.map(op => op.description).join(' \\rightarrow ')
  });

  steps.push({
    title: 'Step 3: Final Result',
    description: 'The matrix is now in reduced row echelon form (RREF).',
    latex: `\\text{RREF}(A) = ${matrixToLatex(result)}`
  });

  return {
    rref: result,
    steps
  };
}

export function calculateRREF(matrix: number[][]): RREFResult {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const fractionMatrix: Fraction[][] = [];

  for (let i = 0; i < rows; i++) {
    fractionMatrix[i] = [];
    for (let j = 0; j < cols; j++) {
      fractionMatrix[i][j] = Fraction.fromNumber(matrix[i][j]);
    }
  }

  return getRREFSteps(fractionMatrix);
}
