import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        harbour: {
          950: 'var(--color-harbour-950)',
          900: 'var(--color-harbour-900)',
          700: 'var(--color-harbour-700)',
        },
        charcoal: {
          950: 'var(--color-harbour-950)',
          900: 'var(--color-harbour-900)',
        },
        seal: 'var(--color-seal)',
        'seal-dim': 'var(--color-seal-dim)',
        amber: 'var(--color-amber)',
        coral: 'var(--color-coral)',
        gate: 'var(--color-seal)',
        hazard: 'var(--color-amber)',
        emergency: 'var(--color-coral)',
        steel: 'var(--color-steel)',
        brand: 'var(--color-brand)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
      },
    },
  },
  plugins: [],
};

export default config;
