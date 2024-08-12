/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    content: [
      // ...
      'node_modules/flowbite-react/lib/esm/**/*.js'
  ]
  },
  plugins: [
    require('flowbite/plugin')
  ]
}