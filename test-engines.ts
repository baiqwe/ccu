import { Fraction } from '@/components/engines/Fraction';
import { calculateInverse } from '@/components/engines/InverseSteps';
import { calculateRREF } from '@/components/engines/RREFSteps';
import { calculateMultiplication } from '@/components/engines/MultiplicationSteps';

console.log('=== Testing Fraction Class ===');

const f1 = new Fraction(2, 4);
console.log('2/4 simplified:', f1.toString(), '=>', f1.toLatex());

const f2 = new Fraction(1, 3);
const f3 = new Fraction(1, 6);
const sum = f2.add(f3);
console.log('1/3 + 1/6 =', sum.toString(), '=>', sum.toLatex());

const f4 = new Fraction(2, 3);
const f5 = new Fraction(3, 4);
const product = f4.multiply(f5);
console.log('2/3 × 3/4 =', product.toString(), '=>', product.toLatex());

console.log('\n=== Testing Inverse Matrix ===');

const matrix2x2 = [
  [1, 2],
  [3, 4]
];

const inverseResult = calculateInverse(matrix2x2);
console.log('Matrix:', matrix2x2);
console.log('Inverse exists:', inverseResult.exists);
if (inverseResult.exists) {
  console.log('Inverse:', inverseResult.inverse.map(row => row.map(f => f.toString())));
  console.log('Steps:', inverseResult.steps.length);
}

console.log('\n=== Testing RREF ===');

const rrefMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const rrefResult = calculateRREF(rrefMatrix);
console.log('Matrix:', rrefMatrix);
console.log('RREF:', rrefResult.rref.map(row => row.map(f => f.toString())));
console.log('Steps:', rrefResult.steps.length);

console.log('\n=== Testing Matrix Multiplication ===');

const matrixA = [
  [1, 2],
  [3, 4]
];

const matrixB = [
  [5, 6],
  [7, 8]
];

const multResult = calculateMultiplication(matrixA, matrixB);
console.log('Matrix A:', matrixA);
console.log('Matrix B:', matrixB);
console.log('Product:', multResult.result.map(row => row.map(f => f.toString())));
console.log('Steps:', multResult.steps.length);

console.log('\n=== All Tests Completed ===');
