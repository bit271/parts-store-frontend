# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Setup guide

1.  Create project using Vite + React:

    $ npm create vite@latest parts-store-frontend -- --template react
    $ cd parts-store-frontend
    $ npm install

2.  Install Tailwind CSS v3:

    $ npm install -D tailwindcss@3 postcss autoprefixer
    $ npx tailwindcss init -p
    
    edit 'tailwind.config.js'

        /** @type {import('tailwindcss').Config} */
        module.exports = {
        content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
            extend: {},
        },
        plugins: [],
        }
    
    Replace everything in 'src/index.css'

        @import "tailwindcss";

3.  Install shadcn/ui:

    https://ui.shadcn.com/docs/installation/vite

