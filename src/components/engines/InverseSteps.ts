import { Fraction } from './Fraction';

export interface Step {
  title: string;
  description: string;
  latex: string;
  subSteps?: Step[];
}

export interface InverseResult {
  inverse: Fraction[][];
  steps: Step[];
  exists: boolean;
}

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

function calculateCofactors(matrix: Fraction[][]): Fraction[][] {
  const n = matrix.length;
  const cofactors: Fraction[][] = [];

  for (let i = 0; i < n; i++) {
    cofactors[i] = [];
    for (let j = 0; j < n; j++) {
      const minor = getMinor(matrix, i, j);
      const minorDet = calculateDeterminant(minor);
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      cofactors[i][j] = new Fraction(sign * minorDet.numerator, minorDet.denominator);
    }
  }

  return cofactors;
}

function transpose(matrix: Fraction[][]): Fraction[][] {
  const n = matrix.length;
  const result: Fraction[][] = [];

  for (let i = 0; i < n; i++) {
    result[i] = [];
    for (let j = 0; j < n; j++) {
      result[i][j] = matrix[j][i].clone();
    }
  }

  return result;
}

function matrixToLatex(matrix: Fraction[][], showFraction: boolean = true): string {
  const n = matrix.length;
  let latex = '\\begin{pmatrix}';

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (showFraction) {
        latex += matrix[i][j].toLatex();
      } else {
        latex += matrix[i][j].toString();
      }
      if (j < n - 1) latex += ' & ';
    }
    if (i < n - 1) latex += ' \\\\ ';
  }

  latex += '\\end{pmatrix}';
  return latex;
}

function multiplyMatrixByScalar(matrix: Fraction[][], scalar: Fraction): Fraction[][] {
  const n = matrix.length;
  const result: Fraction[][] = [];

  for (let i = 0; i < n; i++) {
    result[i] = [];
    for (let j = 0; j < n; j++) {
      result[i][j] = matrix[i][j].multiply(scalar);
    }
  }

  return result;
}

export function getInverseSteps(matrix: Fraction[][]): InverseResult {
  const steps: Step[] = [];
  const n = matrix.length;

  const det = calculateDeterminant(matrix);
  steps.push({
    title: 'Step 1: Find the Determinant',
    description: 'First, we calculate the determinant of the matrix. If it is 0, the inverse does not exist.',
    latex: `\\det(A) = ${det.toLatex()}`
  });

  if (det.isZero()) {
    return {
      inverse: [],
      steps,
      exists: false
    };
  }

  const cofactors = calculateCofactors(matrix);
  steps.push({
    title: 'Step 2: Find the Cofactor Matrix',
    description: 'Calculate the cofactor for each element.',
    latex: `C = ${matrixToLatex(cofactors)}`
  });

  const adjugate = transpose(cofactors);
  steps.push({
    title: 'Step 3: Find the Adjugate Matrix',
    description: 'Transpose the cofactor matrix.',
    latex: `\\text{adj}(A) = C^T = ${matrixToLatex(adjugate)}`
  });

  const oneOverDet = new Fraction(det.denominator, det.numerator);
  const inverse = multiplyMatrixByScalar(adjugate, oneOverDet);

  steps.push({
    title: 'Step 4: Multiply by 1/Determinant',
    description: 'Multiply the adjugate matrix by 1 over the determinant.',
    latex: `A^{-1} = \\frac{1}{${det.toLatex()}} \\times ${matrixToLatex(adjugate)} = ${matrixToLatex(inverse)}`
  });

  return {
    inverse,
    steps,
    exists: true
  };
}

export function calculateInverse(matrix: number[][]): InverseResult {
  const n = matrix.length;
  const fractionMatrix: Fraction[][] = [];

  for (let i = 0; i < n; i++) {
    fractionMatrix[i] = [];
    for (let j = 0; j < n; j++) {
      fractionMatrix[i][j] = Fraction.fromNumber(matrix[i][j]);
    }
  }

  return getInverseSteps(fractionMatrix);
}
