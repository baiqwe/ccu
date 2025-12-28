# Quick Start Guide

## Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Pages

### Home Page
- English: http://localhost:3000/en
- Spanish: http://localhost:3000/es

### Calculator Pages

#### English
- Inverse Matrix: http://localhost:3000/en/inverse-matrix-calculator
- RREF: http://localhost:3000/en/rref-calculator
- Matrix Multiplication: http://localhost:3000/en/matrix-multiplication-calculator
- Determinant: http://localhost:3000/en/determinant-calculator
- Eigenvalue: http://localhost:3000/en/eigenvalue-calculator
- Rank: http://localhost:3000/en/rank-matrix-calculator

#### Spanish
- Inverse Matrix: http://localhost:3000/es/calculadora-matriz-inversa
- RREF: http://localhost:3000/es/calculadora-gauss-jordan
- Matrix Multiplication: http://localhost:3000/es/calculadora-multiplicacion-matrices
- Determinant: http://localhost:3000/es/calculadora-determinante
- Eigenvalue: http://localhost:3000/es/calculadora-valores-propios
- Rank: http://localhost:3000/es/calculadora-rango-matriz

## Build

Build the application for production:
```bash
npm run build
```

## Production

Start the production server:
```bash
npm start
```

## Linting

Run ESLint:
```bash
npm run lint
```

## Project Features

### SEO Optimized
- ✅ Static generation (SSG) for all pages
- ✅ Dynamic metadata per tool and locale
- ✅ JSON-LD structured data
- ✅ Canonical URLs
- ✅ Alternate language links
- ✅ FAQ sections for long-tail keywords

### User Experience
- ✅ Step-by-step solutions
- ✅ Mobile-friendly custom keypad
- ✅ Keyboard navigation
- ✅ Fraction-based calculations
- ✅ Copy LaTeX functionality

### Internationalization
- ✅ English (en)
- ✅ Spanish (es)
- ✅ Easy to add more languages

## Troubleshooting

### Port already in use
If port 3000 is already in use, you can specify a different port:
```bash
npm run dev -- -p 3001
```

### Build errors
If you encounter build errors, try:
```bash
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript errors
Make sure you have the latest TypeScript version:
```bash
npm install -D typescript@latest
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
Build the project and deploy the `.next` folder:
```bash
npm run build
```

## Environment Variables

Create a `.env.local` file for environment-specific settings:

```env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Support

For issues or questions, refer to the README.md file.
