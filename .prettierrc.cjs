/**
 * @type {import('prettier').Options}
 */
module.exports = {
  printWidth: 80, // Maximum line length
  tabWidth: 2, // Number of spaces per indentation level
  useTabs: false, // Indent lines with spaces instead of tabs
  semi: true, // Add semicolons at the ends of statements
  singleQuote: false, // Use single quotes instead of double quotes
  trailingComma: "none", // No trailing commas
  bracketSpacing: true, // Print spaces between brackets in object literals
  bracketSameLine: true, // Put the `>` of a multi-line JSX element at the end of the last line
  plugins: [require.resolve("prettier-plugin-tailwindcss")], // Use Tailwind CSS plugin
};