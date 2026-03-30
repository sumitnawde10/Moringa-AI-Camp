# Moringa Camp Frontend

Moringa Camp Frontend is a React-based patient registration and medical camp screening app. It is designed to help a volunteer, operator, or health worker register a patient, collect basic health information, route the patient to a selected camp, and submit camp-specific screening forms in a single flow.

This frontend currently includes:
- Patient registration
- Health assessment
- Camp selection
- Camp-specific questionnaires
- Final registration summary

## Project Overview

The app follows this main flow:

1. Register patient details
2. Fill basic health assessment
3. Select a medical camp
4. Complete the selected camp questionnaire
5. Review the summary page

The application stores form progress in React context during the session, so data from each step can be shown together on the final summary screen.

## Available Camp Forms

The project currently includes these camp flows:

- Eye
- Dental
- Malnutrition
- Diabetes
- Heart
- Cancer
- Tuberculosis
- Orthopaedic
- Asthma/COPD

## Tech Stack

- React
- React Router
- Material UI
- Emotion
- Create React App

Important packages used:

- `react`
- `react-dom`
- `react-router-dom`
- `@mui/material`
- `@mui/icons-material`
- `@emotion/react`
- `@emotion/styled`

## Folder Notes

This repository’s frontend application lives inside the `frontend` folder.

Run all frontend commands from:

```powershell
cd frontend
```

Important folders:

- `public/`
  Contains static files such as icons, manifest, and HTML template.
- `src/pages/`
  Main screens like registration, health assessment, camp selection, and summary.
- `src/pages/CampForms/`
  All camp-specific forms.
- `src/context/`
  Shared React context used to store form state across steps.
- `src/components/`
  Reusable UI pieces such as `OptionCard`.

## Requirements

Before running the project, install:

- Node.js
- npm
- Git

Recommended:

- Node.js 18 or later

Check installed versions:

```powershell
node -v
npm -v
git --version
```

## First-Time Setup

### 1. Clone the repository

Replace the URL below with your actual repository:

```powershell
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 2. Go to the frontend folder

```powershell
cd YOUR_REPO_NAME/frontend
```

### 3. Install dependencies

```powershell
npm install
```

### 4. Start the development server

```powershell
npm start
```

Then open:

```text
http://localhost:3000
```

## Available Scripts

### Start development server

```powershell
npm start
```

Runs the app in development mode.

### Build for production

```powershell
npm run build
```

Creates an optimized production build inside the `build/` folder.

### Run tests

```powershell
npm test
```

Starts the test runner.

## Quick Setup Summary

If someone wants to run the project from scratch, these are the main commands:

```powershell
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME/frontend
npm install
npm start
```

## How State Works

The app uses `FormProvider` from [`src/context/FormContext.js`](d:\Moringa_Camp\frontend\src\context\FormContext.js) to keep data from all steps in one shared store during the session.

That means:

- Registration data
- Health assessment data
- Selected camp
- Camp-specific form answers

are all combined and then shown on the summary page.

## Main Screens

Key screens in the current frontend:

- [`Register.jsx`](d:\Moringa_Camp\frontend\src\pages\Register.jsx)
- [`HealthAssessment.jsx`](d:\Moringa_Camp\frontend\src\pages\HealthAssessment.jsx)
- [`CampSelection.jsx`](d:\Moringa_Camp\frontend\src\pages\CampSelection.jsx)
- [`SummaryPage.jsx`](d:\Moringa_Camp\frontend\src\pages\SummaryPage.jsx)

Camp forms are inside:

- [`CampForms`](d:\Moringa_Camp\frontend\src\pages\CampForms)

## Contribution Notes

If you want to contribute or extend the project:

- keep new camp forms inside `src/pages/CampForms/`
- add the route in [`App.js`](d:\Moringa_Camp\frontend\src\App.js)
- add the camp entry in [`CampSelection.jsx`](d:\Moringa_Camp\frontend\src\pages\CampSelection.jsx)
- save form data into `FormContext`
- update [`SummaryPage.jsx`](d:\Moringa_Camp\frontend\src\pages\SummaryPage.jsx) so submitted data is visible
- keep the visual language consistent with the existing Moringa green form style unless a specific camp needs a custom accent

## Common Issues

### `node` or `npm` is not recognized

Node.js is either not installed or not available in system `PATH`.

Install Node.js, then reopen the terminal.

### `npm install` fails

Try:

```powershell
npm cache clean --force
npm install
```

### Port 3000 is already in use

If another app is already using port `3000`, React may ask to use another port. You can accept that and continue.

### Old favicon or app name still appears

Browsers cache icons aggressively. Use a hard refresh:

```text
Ctrl + F5
```

## Good Practices

- Do not commit `node_modules`
- Do not commit secret `.env` values
- Keep form routes, saved state, and summary integration in sync
- Reuse common components where possible instead of duplicating UI logic

## Support

If someone is trying to run the project and gets stuck, ask them to share:

- the command they ran
- the full error output
- their Node.js version
- whether they are running from the `frontend` folder

That usually makes debugging much faster.
