# UniTrack React Homepage

A Vite + React version of the existing UniTrack homepage. It preserves the navy/lavender visual style, main sections, mobile menu, and theme toggle.

## 1. Copy your existing static files
Copy these folders from your current UniTrack project into this project's `public` folder:
- `ASSETS/` (including `ASSETS/logo/UniTrack logo.png`)
- `pages/` (login.html, register.html, task.html)
- `CSS/` and `JS/` if those old pages use the existing stylesheets/scripts

Expected structure:
```
public/ASSETS/logo/UniTrack logo.png
public/pages/login.html
public/pages/register.html
public/pages/task.html
public/CSS/
public/JS/
src/App.jsx
src/main.jsx
src/style.css
index.html
package.json
```
Keep your original files backed up. The React homepage uses `src/style.css`, so do not overwrite it with the old homepage stylesheet.

## 2. Run it
Install Node.js LTS if needed. Open this folder in VS Code, then run in the terminal:
```
npm install
npm run dev
```
Open the local URL Vite shows in the terminal.

## 3. Check the build
```
npm run build
```

## Notes
- Dashboard figures are labelled as sample data and are only a visual preview, not connected to task storage yet.
- Login/register/task links expect the old HTML pages to be copied into `public/pages`.
- The Contact email is a placeholder (`hello@unitrack.example`); replace it or remove that link before submission.
- This is a front-end demo, not secure authentication.
