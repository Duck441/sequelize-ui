const plugin = require('tailwindcss/plugin')

const capitalizeFirst = plugin(function ({ addUtilities }) {
  const newUtilities = {
    '.capitalize-first:first-letter': {
      textTransform: 'uppercase',
    },
  }
  addUtilities(newUtilities, ['responsive', 'hover'])
})

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/ui/components/**/*.{js,ts,jsx,tsx}',
    './src/ui/styles/utils.ts',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        1: '1 1 0%',
        2: '2 2 0%',
        auto: '1 1 auto',
        initial: '0 1 auto',
        none: 'none',
        full: '0 0 100%',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
      },
      gridRowStart: {
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
      },
      gridRowEnd: {
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
      },
      height: {
        0: '0px',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        18: '4.5rem',
        20: '5rem',
        22: '5.5rem',
        24: '6rem',
        26: '6.5rem',
        28: '7rem',
        30: '8.5rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
        px: '1px',
        0.5: '0.125rem',
        1.5: '0.375rem',
        2.5: '0.625rem',
        3.5: '0.875rem',
      },
      minHeight: {
        0: '0px',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        18: '4.5rem',
        20: '5rem',
        22: '5.5rem',
        24: '6rem',
        26: '6.5rem',
        28: '7rem',
        30: '8.5rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
        px: '1px',
        0.5: '0.125rem',
        1.5: '0.375rem',
        2.5: '0.625rem',
        3.5: '0.875rem',
      },
    },
    flex: {
      1: '1 1 0%',
      2: '2 2 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
      full: '0 0 100%',
    },
  },
  variants: {
    extend: {
      margin: ['first', 'last', 'children-not-last'],
      borderWidth: ['first', 'last', 'first', 'last', 'focus-visible'],
      borderColor: ['focus-visible'],
      borderRadius: ['first', 'last', 'hover', 'focus'],
      outline: ['focus', 'focus-visible'],
      fontWeight: ['hover', 'focus', 'focus-visible'],
    },
    transitionProperty: ['hover'],
    display: [
      'children',
      'children-first',
      'children-last',
      'children-odd',
      'children-even',
      'children-not-first',
      'children-not-last',
      'children-hover',
      'hover',
      'children-focus',
      'focus',
      'children-focus-within',
      'focus-within',
      'children-active',
      'active',
      'children-visited',
      'visited',
      'children-disabled',
      'disabled',
      'responsive',
    ],
  },
  plugins: [require('tailwindcss-children'), require('@tailwindcss/forms'), capitalizeFirst],
}
