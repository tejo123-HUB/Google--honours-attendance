# Google Cloud Honors Attendance Tracker

A premium, fast, and responsive web application designed for seamlessly marking and generating attendance reports for the Google Cloud Honors program. 

The application has been explicitly designed for an optimized mobile experience with a stunning modern light-theme UI and soft-shadow neumorphic elements. 

## Features

- **Dynamic Section Routing**: Automatically loads students for specific sections (CSE-I through CSE-VII) without page reloads.
- **Offline-Ready Database**: Student records are securely loaded via a localized `data.js` file, meaning the app runs blazingly fast without relying on external API calls or Google Sheets fetch limits.
- **Premium Mobile UI**:
  - Soft drop-shadows and glassmorphism elements.
  - Sticky headers for easy tracking on long lists.
  - Interactive "Classroom Cards" for the home dashboard.
  - Native-feeling bottom sheet modals for reports.
- **One-Click Reports**: Generates a clean, formatted text report of absent roll numbers (e.g., `CSE-IV\n25EU04202\n25EU04209`) and offers a 1-click "Copy" button.

## Architecture

The project is built using pure Vanilla web technologies for maximum performance and zero dependency overhead:
- **`index.html`**: The structural backbone containing the Section Grid View and Attendance Tracking View.
- **`style.css`**: A bespoke CSS architecture featuring a curated professional color palette, fluid typography, CSS Grid/Flexbox layouts, and custom micro-animations. 
- **`app.js`**: Vanilla JavaScript handling the DOM manipulation, view transitions, and attendance state logic.
- **`data.js`**: A pure JavaScript object storing the structured JSON of all students across all branches. 

## Usage

1. Open `index.html` in any modern web browser.
2. Select the specific class section you are monitoring from the home dashboard.
3. Tap on a student's card to mark them as **Absent** (the card will highlight red and display a checkmark).
4. Tap the **Generate** button in the sticky header.
5. Review the formatted list in the pop-up modal and click **Copy**.

## Deployment

This static site can be hosted anywhere, but is perfectly suited for **GitHub Pages**.

1. Navigate to the `Settings` of your GitHub repository.
2. Under `Pages`, set the source to deploy from the `main` branch.
3. Your site will automatically go live, and you can map a Custom Domain to it if desired. 

---
*Built for the Google Cloud Honors Program.*
