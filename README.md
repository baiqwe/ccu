# Matrix Calculator - SEO Optimized

A Next.js 14+ application with internationalization (i18n) for matrix calculations with step-by-step solutions.

## Features

- **Multi-language Support**: English and Spanish
- **SEO Optimized**: Dynamic metadata, JSON-LD structured data, and localized URLs
- **Step-by-Step Solutions**: Detailed explanations for inverse matrix, RREF, and multiplication
- **Mobile Friendly**: Custom keypad for easy input on mobile devices
- **Fraction-based Calculations**: All calculations use fractions for precision

## Supported Calculators

1. **Inverse Matrix Calculator** - Flagship feature (KD 26)
2. **RREF Calculator** - Blue ocean market (KD 22)
3. **Matrix Multiplication Calculator** - High CPC value
4. **Matrix Determinant Calculator**
5. **Eigenvalue Calculator**
6. **Matrix Rank Calculator**

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── [tool]/         # Dynamic tool pages
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── page.tsx            # Root redirect
├── components/
│   ├── engines/            # Pure math logic
│   │   ├── Fraction.ts
│   │   ├── InverseSteps.ts
│   │   ├── RREFSteps.ts
│   │   └── MultiplicationSteps.ts
│   ├── calculators/        # UI components
│   │   ├── MatrixInput.tsx
│   │   ├── Keypad.tsx
│   │   ├── StepViewer.tsx
│   │   └── CalculatorWrapper.tsx
│   ├── ads/               # Ad components
│   │   └── AdSlot.tsx
│   └── seo/               # SEO components
│       └── FAQSection.tsx
├── lib/
│   ├── tools-config.ts     # Tool configuration
│   └── seo-schema.ts       # JSON-LD generator
└── i18n.ts                 # i18n configuration

messages/
├── en.json                 # English translations
└── es.json                 # Spanish translations
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## URL Structure

- English: `/en/inverse-matrix-calculator`
- Spanish: `/es/calculadora-matriz-inversa`

## SEO Features

- **Static Generation (SSG)**: All pages are pre-built for maximum performance
- **Dynamic Metadata**: Title and description generated per tool and locale
- **JSON-LD**: Structured data for SoftwareApplication schema
- **Canonical URLs**: Proper canonical and alternate language links
- **FAQ Sections**: Long-tail keyword targeting

## Math Engine

All calculations are based on the `Fraction` class to ensure precision:
- GCD-based simplification
- Support for negative numbers
- LaTeX output for display

## License

MIT
