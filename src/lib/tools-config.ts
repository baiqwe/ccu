export const toolsConfig = {
  'inverse': {
    name: 'Inverse Matrix Calculator',
    slugs: {
      en: 'inverse-matrix-calculator',
      es: 'calculadora-matriz-inversa'
    },
    category: 'flagship',
    relatedTools: ['determinant', 'rref']
  },
  'rref': {
    name: 'RREF Calculator',
    slugs: {
      en: 'rref-calculator',
      es: 'calculadora-gauss-jordan'
    },
    category: 'blue-ocean',
    relatedTools: ['inverse', 'rank']
  },
  'multiplication': {
    name: 'Matrix Multiplication Calculator',
    slugs: {
      en: 'matrix-multiplication-calculator',
      es: 'calculadora-multiplicacion-matrices'
    },
    category: 'money',
    relatedTools: ['inverse', 'determinant']
  },
  'determinant': {
    name: 'Matrix Determinant Calculator',
    slugs: {
      en: 'determinant-calculator',
      es: 'calculadora-determinante'
    },
    category: 'long-tail',
    relatedTools: ['inverse', 'rank']
  },
  'eigenvalue': {
    name: 'Eigenvalue Calculator',
    slugs: {
      en: 'eigenvalue-calculator',
      es: 'calculadora-valores-propios'
    },
    category: 'long-tail',
    relatedTools: ['inverse', 'determinant']
  },
  'rank': {
    name: 'Matrix Rank Calculator',
    slugs: {
      en: 'rank-matrix-calculator',
      es: 'calculadora-rango-matriz'
    },
    category: 'long-tail',
    relatedTools: ['rref', 'determinant']
  },
  'system-equations': {
    name: 'System of Linear Equations Solver',
    slugs: {
      en: 'system-of-equations-solver',
      es: 'resolvedor-sistema-ecuaciones'
    },
    category: 'high-value',
    relatedTools: ['rref', 'cramers-rule']
  },
  'cramers-rule': {
    name: "Cramer's Rule Calculator",
    slugs: {
      en: 'cramers-rule-calculator',
      es: 'calculadora-regla-cramer'
    },
    category: 'high-value',
    relatedTools: ['determinant', 'system-equations']
  },
  'matrix-power': {
    name: 'Matrix Power Calculator',
    slugs: {
      en: 'matrix-power-calculator',
      es: 'calculadora-potencia-matriz'
    },
    category: 'high-value',
    relatedTools: ['multiplication', 'inverse']
  }
};

export function findToolIdBySlug(slug: string, locale: string): string | null {
  for (const [toolId, config] of Object.entries(toolsConfig)) {
    if (config.slugs[locale as keyof typeof config.slugs] === slug) {
      return toolId;
    }
  }
  return null;
}

export function getSlugByToolId(toolId: string, locale: string): string | null {
  const config = toolsConfig[toolId as keyof typeof toolsConfig];
  if (!config) return null;
  return config.slugs[locale as keyof typeof config.slugs] || null;
}
