import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Primitive colors (from RP tokens, OKLCH converted to hex)
        black: '#000000',
        white: '#ffffff',
        gray: {
          50: '#f5f5f5',   // gray-50: L=0.97
          200: '#ebebeb',  // gray-200: L=0.94
          400: '#d9d9d9',  // gray-400: L=0.88
          500: '#737373',  // gray-500: L=0.556
          900: '#262626',  // gray-900: L=0.205
        },
        red: '#c4391f',      // OKLCH(0.55, 0.2, 25)
        green: '#2d8a4e',    // OKLCH(0.55, 0.15, 145)
        amber: '#b8930d',    // OKLCH(0.75, 0.15, 75)
        blue: '#3366cc',     // OKLCH(0.55, 0.15, 250)

        // Semantic colors
        primary: '#000000',
        secondary: '#737373',
        muted: '#262626',
        inverse: '#ffffff',

        background: {
          DEFAULT: '#ffffff',
          subtle: '#f5f5f5',
          muted: '#ebebeb',
          inverse: '#000000',
        },

        border: {
          DEFAULT: '#d9d9d9',
          subtle: '#ebebeb',
          strong: '#000000',
        },

        destructive: '#c4391f',
        positive: '#2d8a4e',
        warning: '#b8930d',
        info: '#3366cc',
      },
      fontFamily: {
        geist: 'var(--font-antarctica)',
        dmmono: 'var(--font-antarctica)',
        antarctica: 'var(--font-antarctica)',
        sans: 'var(--font-antarctica)',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '18px',
        lg: '20px',
        display: '48px',
      },
      fontWeight: {
        light: '280',
        normal: '380',
      },
      lineHeight: {
        tight: '1',
        normal: '1.15',
        relaxed: '1.5',
      },
      letterSpacing: {
        tightest: '-1px',
        tight: '-0.1px',
        normal: '0px',
        wide: '0.1px',
        wider: '1px',
      },
      spacing: {
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '4': '12px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '12': '48px',
        '35': '140px',
      },
      gap: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '24px',
        '2xl': '32px',
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '12px',
        full: '9999px',
      },
      maxWidth: {
        xs: '320px',
        sm: '480px',
        md: '640px',
        lg: '768px',
        xl: '900px',
        '2xl': '1024px',
        '3xl': '1280px',
        '4xl': '1440px',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      boxShadow: {
        sm: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px',
        inset: 'rgba(255, 255, 255, 0.5) 0px 0px 4px 1px inset',
      },
    }
  },
  plugins: [tailwindcssAnimate]
} satisfies Config
