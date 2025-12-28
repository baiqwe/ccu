export const toolsConfig = {
  'inverse-matrix': {
    name: 'Inverse Matrix Calculator',
    slugs: {
      en: 'inverse-matrix-calculator',
      es: 'calculadora-matriz-inversa'
    },
    category: 'flagship'
  },
  'rref': {
    name: 'RREF Calculator',
    slugs: {
      en: 'rref-calculator',
      es: 'calculadora-gauss-jordan'
    },
    category: 'blue-ocean'
  },
  'multiplication': {
    name: 'Matrix Multiplication Calculator',
    slugs: {
      en: 'matrix-multiplication-calculator',
      es: 'calculadora-multiplicacion-matrices'
    },
    category: 'money'
  },
  'determinant': {
    name: 'Matrix Determinant Calculator',
    slugs: {
      en: 'determinant-calculator',
      es: 'calculadora-determinante'
    },
    category: 'long-tail'
  },
  'eigenvalue': {
    name: 'Eigenvalue Calculator',
    slugs: {
      en: 'eigenvalue-calculator',
      es: 'calculadora-valores-propios'
    },
    category: 'long-tail'
  },
  'rank': {
    name: 'Matrix Rank Calculator',
    slugs: {
      en: 'rank-matrix-calculator',
      es: 'calculadora-rango-matriz'
    },
    category: 'long-tail'
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
