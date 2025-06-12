/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'sm': '481px', // Tablet breakpoint
        'md': '1025px', // Desktop breakpoint
        'lg': '1441px', // Widescreen breakpoint
      },
      gridTemplateColumns: {
        '4': 'repeat(4, minmax(0, 1fr))', // Default (Mobile)
        '8': 'repeat(8, minmax(0, 1fr))', // Tablet
        '12': 'repeat(12, minmax(0, 1fr))', // Desktop
        '16': 'repeat(16, minmax(0, 1fr))', // Widescreen
      },
      gap: {
        '12px': '12px',
        '16px': '16px',
        '24px': '24px',
        '32px': '32px',
      },
      spacing: { // Optional: Map gutter sizes to spacing scale if you prefer using default gap classes
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
      },      colors: {
        background: 'var(--background)',
        card: 'var(--card)',
        'card-hover': 'var(--card-hover)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent-blue': 'var(--accent-blue)',
        'accent-green': 'var(--accent-green)',
        border: 'var(--border)',
        muted: 'var(--muted)',
        error: 'var(--error-red)',
        success: 'var(--success)',
        warning: 'var(--warning)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}