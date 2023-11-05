// Import necessary modules
import { execSync } from 'child_process'; // For running shell commands
import fs from 'fs'; // For file system operations
import { fileURLToPath } from 'url'; // For converting import.meta.url to a file path
import path from 'path'; // For working with file paths

// Get the current module's file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module's file path
const __dirname = path.dirname(__filename);

try {
  // Check if Tailwind CSS is already installed
  execSync('npm ls tailwindcss', { stdio: 'ignore' });
  console.log('Tailwind CSS is already installed.');
} catch (error) {
  // If Tailwind CSS is not installed, install it and its dependencies
  execSync('npm install -D tailwindcss postcss autoprefixer', { stdio: 'inherit' });
}

// Initialize a Tailwind CSS configuration file
execSync('npx tailwindcss init -p', { stdio: 'inherit' });

// Create a CSS file to include Tailwind's styles
const stylesDir = path.join(__dirname, 'src');
const tailwindCSSFile = path.join(stylesDir, 'index.css');

const cssCode = `@tailwind base;
@tailwind components;
@tailwind utilities;

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    width: 100vw;
    height: 100vh;
    scroll-behavior: smooth;
}
`;

const tailwindConfigCode = `module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        
      },
      fontFamily: {
      
      },
      fontSize: {
        'xs': ['0.75rem', '1rem'],     // Example: Extra small screens
        'sm': ['0.875rem', '1.25rem'],  // Example: Small screens
        'base': ['1rem', '1.5rem'],     // Example: Medium screens
        'lg': ['1.125rem', '1.75rem'],  // Example: Large screens
        'xl': ['1.25rem', '2rem'],      // Example: Extra large screens
        '2xl': ['1.5rem', '2.25rem'],    // Example: 2X large screens
        '3xl': ['1.875rem', '2.5rem'],   // Example: 3X large screens
        '4xl': ['2.25rem', '3rem'],      // Example: 4X large screens
        '5xl': ['3rem', '1'],            // Example: 5X large screens
        '6xl': ['4rem', '1'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
};`

// Write the necessary Tailwind CSS imports to the CSS file
fs.writeFileSync(tailwindCSSFile, cssCode);

const tailwindConfigFile = path.join(__dirname, 'tailwind.config.js');

fs.writeFileSync(tailwindConfigFile, tailwindConfigCode);

console.log("Tailwind Config Code Done Successfully!!!!!")

console.log('Tailwind CSS has been successfully set up in your React Vite project.');

// Start the development server
// execSync('npm run dev', { stdio: 'inherit' });
