# Moringa Camp Frontend

This is the frontend for the Moringa Camp patient registration and eye assessment app.

It is built with:
- React
- React Router
- Material UI

Main packages used in this project include:
- `react`
- `react-dom`
- `react-router-dom`
- `@mui/material`
- `@mui/icons-material`
- `@emotion/react`
- `@emotion/styled`

## Project Folder

The Git repository is inside the `frontend` folder.

If your friend downloads or clones this project, all frontend commands should be run from:

```powershell
cd frontend
```

## Requirements

Before starting, make sure these are installed on the local system:

- Node.js
- npm
- Git

Recommended:
- Node.js 18 or later

To check installed versions:

```powershell
node -v
npm -v
git --version
```

## How To Get This Project On A Local System

### 1. Clone the repository

Replace the URL below with your actual GitHub repository link:

```powershell
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 2. Go into the frontend folder

```powershell
cd YOUR_REPO_NAME/frontend
```

### 3. Install dependencies

```powershell
npm install
```

This command installs all required packages from `package.json`, including:
- React
- React Router
- Material UI
- Material UI Icons
- Emotion

You do not need to install Material UI separately if you run `npm install`.

### 4. Start the development server

```powershell
npm start
```

After that, open:

```text
http://localhost:3000
```

## Available Scripts

### Run in development

```powershell
npm start
```

Starts the app in development mode.

## If Someone Wants To Install Packages Manually

Normally this is not needed, because `npm install` installs everything automatically.

If someone wants to install the main frontend packages manually, these are the important ones:

```powershell
npm install react react-dom react-router-dom
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

### Create production build

```powershell
npm run build
```

Creates an optimized production build inside the `build` folder.

### Run tests

```powershell
npm test
```

Starts the test runner.

## First-Time Setup Summary

If someone is setting it up for the first time, these are the only commands they need:

```powershell
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME/frontend
npm install
npm start
```

## Common Issues

### `node` or `npm` is not recognized

Node.js is not installed, or it is not added to system `PATH`.

Install Node.js from the official website, then reopen the terminal.

### `npm install` fails

Try:

```powershell
npm cache clean --force
npm install
```

### Port 3000 is already in use

If another app is using port `3000`, React may ask to run on another port. You can allow that and continue.

## Notes

- Do not commit `node_modules`
- Do not commit `.env` files with secrets
- The `.gitignore` file already excludes common local and generated files

## Current Main Features

- Patient registration flow
- Health assessment flow
- Camp selection
- Eye questionnaire for child and adult patients
- Summary page for submitted answers

## Support

If your friend is setting this up and something does not work, ask them to send:

- the command they ran
- the full terminal error
- their Node.js version from `node -v`

That usually makes debugging much faster.
