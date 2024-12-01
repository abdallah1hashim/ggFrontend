/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", "class"],
  theme: {
  	container: {
  		center: 'true',
  		padding: '1rem',
  		screens: {
  			'2xl': '1400px',
  			xl: '1200px',
  			lg: '992px',
  			md: '768px',
  			sm: '576px'
  		}
  	},
  	extend: {
  		colors: {
  			primary: {
  				'50': '#f9f9f9',
  				'100': '#f0f0f0',
  				'200': '#d9d9d9',
  				'300': '#bfbfbf',
  				'400': '#8c8c8c',
  				'500': '#595959',
  				'600': '#404040',
  				'700': '#262626',
  				'800': '#000000',
  				DEFAULT: '#000000'
  			},
  			secondary: {
  				'50': '#ffffff',
  				'100': '#f9f9f9',
  				'200': '#f0f0f0',
  				'300': '#d9d9d9',
  				'400': '#bfbfbf',
  				'500': '#a6a6a6',
  				'600': '#737373',
  				'700': '#595959',
  				'800': '#404040',
  				DEFAULT: '#ffffff'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	plugins: []
  },
    plugins: [require("tailwindcss-animate")]
};
