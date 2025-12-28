#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'next.config.js',
  'tailwind.config.js',
  'postcss.config.js',
  'messages/en.json',
  'messages/es.json',
  'src/app/page.tsx',
  'src/app/globals.css',
  'src/app/[locale]/layout.tsx',
  'src/app/[locale]/page.tsx',
  'src/app/[locale]/[tool]/page.tsx',
  'src/components/engines/Fraction.ts',
  'src/components/engines/InverseSteps.ts',
  'src/components/engines/RREFSteps.ts',
  'src/components/engines/MultiplicationSteps.ts',
  'src/components/calculators/MatrixInput.tsx',
  'src/components/calculators/Keypad.tsx',
  'src/components/calculators/StepViewer.tsx',
  'src/components/calculators/CalculatorWrapper.tsx',
  'src/components/ads/AdSlot.tsx',
  'src/components/seo/FAQSection.tsx',
  'src/lib/tools-config.ts',
  'src/lib/seo-schema.ts',
  'src/i18n.ts',
  'src/middleware.ts',
];

console.log('🔍 Checking project structure...\n');

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file}`);
  if (!exists) allFilesExist = false;
});

console.log('\n' + (allFilesExist ? '✅ All required files exist!' : '❌ Some files are missing!'));

console.log('\n📦 Checking package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});

  console.log('\nDependencies:');
  dependencies.forEach(dep => console.log(`  ✅ ${dep}`));

  console.log('\nDev Dependencies:');
  devDependencies.forEach(dep => console.log(`  ✅ ${dep}`));

  const requiredDeps = ['next', 'react', 'react-dom', 'next-intl'];
  const missingDeps = requiredDeps.filter(dep => !dependencies.includes(dep));

  if (missingDeps.length > 0) {
    console.log('\n❌ Missing dependencies:', missingDeps);
    allFilesExist = false;
  } else {
    console.log('\n✅ All required dependencies are present!');
  }
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
  allFilesExist = false;
}

console.log('\n' + (allFilesExist ? '🎉 Project structure is complete!' : '⚠️  Please fix the issues above.'));
