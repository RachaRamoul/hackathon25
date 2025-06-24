import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Condensed', 'Roboto', 'sans-serif']
      },
    },
  },
  plugins: [typography],
}

export default config
