# FlyRank Internship Capstone

A React + Vite project with a reusable settings form component.

## Features

- Reusable `SettingsForm` component with controlled inputs
- Client-side validation for display name and email
- Accessible labels, error messages, and ARIA attributes
- Vitest tests for validation behavior

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Running Tests

Run tests in watch mode:

```bash
npm test
```

Run tests once (useful for CI):

```bash
npm run test:run
```

## Project Structure

```text
src/
  components/
    SettingsForm.jsx
    SettingsForm.css
    SettingsForm.test.jsx
  utils/
    settingsFormValidation.js
  App.jsx
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest in watch mode |
| `npm run test:run` | Run Vitest once |
