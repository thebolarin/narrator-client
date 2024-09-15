// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html', 
    './src/**/*.vue', 
    './src/**/*.ts',
     './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      // colors: {
      //   sand: {
      //     50: '#F9F7F4',  // lighter shade
      //     100: '#F3EFE9',
      //     200: '#EDE7D9',
      //     300: '#E7E0C8',
      //     400: '#E1D8B8',
      //     500: '#DBD0A7',
      //     600: '#D5C896',
      //     700: '#15383D',
      //     800: '#C9B873',
      //     900: '#C3B061', // darker shade
      //   },
      // },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('flowbite/plugin')({
      charts: true,
  }),
  ],
}
