export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive']
      },
      colors: {
        pixelPink: '#ffb6c1',
        pixelRed: '#ff1493',
        pixelLight: '#ffc0cb',
        pixelDark: '#c71585'
      },
      boxShadow: {
        pixel: '4px 4px 0 0 rgba(0, 0, 0, 0.8)',
        pixelHover: '6px 6px 0 0 rgba(0, 0, 0, 0.6)',
        pixelActive: '2px 2px 0 0 rgba(0, 0, 0, 0.8)'
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        }
      }
    }
  },
  plugins: []
}
