export class Fraction {
  numerator: number;
  denominator: number;

  constructor(n: number, d: number = 1) {
    if (d === 0) {
      throw new Error('Denominator cannot be zero');
    }
    const common = this.gcd(Math.abs(n), Math.abs(d));
    this.numerator = (n / common) * (d < 0 ? -1 : 1);
    this.denominator = Math.abs(d) / common;
  }

  private gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  add(other: Fraction): Fraction {
    const newNumerator = this.numerator * other.denominator + other.numerator * this.denominator;
    const newDenominator = this.denominator * other.denominator;
    return new Fraction(newNumerator, newDenominator);
  }

  subtract(other: Fraction): Fraction {
    const newNumerator = this.numerator * other.denominator - other.numerator * this.denominator;
    const newDenominator = this.denominator * other.denominator;
    return new Fraction(newNumerator, newDenominator);
  }

  multiply(other: Fraction): Fraction {
    return new Fraction(this.numerator * other.numerator, this.denominator * other.denominator);
  }

  divide(other: Fraction): Fraction {
    if (other.numerator === 0) {
      throw new Error('Cannot divide by zero');
    }
    return new Fraction(this.numerator * other.denominator, this.denominator * other.numerator);
  }

  negate(): Fraction {
    return new Fraction(-this.numerator, this.denominator);
  }

  equals(other: Fraction): boolean {
    return this.numerator === other.numerator && this.denominator === other.denominator;
  }

  isZero(): boolean {
    return this.numerator === 0;
  }

  toNumber(): number {
    return this.numerator / this.denominator;
  }

  toLatex(): string {
    if (this.denominator === 1) return `${this.numerator}`;
    return `\\frac{${this.numerator}}{${this.denominator}}`;
  }

  toString(): string {
    if (this.denominator === 1) return `${this.numerator}`;
    return `${this.numerator}/${this.denominator}`;
  }

  static fromNumber(num: number): Fraction {
    const tolerance = 1e-10;
    const sign = num < 0 ? -1 : 1;
    num = Math.abs(num);

    if (Math.abs(num - Math.round(num)) < tolerance) {
      return new Fraction(sign * Math.round(num), 1);
    }

    for (let d = 1; d <= 10000; d++) {
      const n = Math.round(num * d);
      if (Math.abs(num - n / d) < tolerance) {
        return new Fraction(sign * n, d);
      }
    }

    return new Fraction(sign * Math.round(num * 10000), 10000);
  }

  clone(): Fraction {
    return new Fraction(this.numerator, this.denominator);
  }
}
