/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{html,js}', // مسیر فایل‌هایی که می‌خواهی از Tailwind در اون‌ها استفاده کنی
    ],
    theme: {
      extend: {
        colors: {
            primary: {
                50: '#eef2ff',
                100: '#e0e7ff',
                500: '#6366f1',
                600: '#4f46e5',
                700: '#4338ca',
                800: '#3730a3',
                900: '#312e81'
            }
        }
      },
    },
    plugins: [],
  }
  