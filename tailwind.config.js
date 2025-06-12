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
      },
      colors: {
        // Define your global colors here, mapping to CSS variables
        // Example:
        // 'background': 'var(--background)',
        // 'card': 'var(--card)',
        // 'text-primary': 'var(--text-primary)',
        // 'text-secondary': 'var(--text-secondary)',
        // 'accent': 'var(--accent)',
        // 'muted': 'hsl(var(--muted))', // Example for HSL color
      },
    },
  },
  plugins: [],
}