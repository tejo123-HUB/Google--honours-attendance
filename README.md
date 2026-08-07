# CSE-4 Attendance Tracker

A sleek, premium, and fully responsive web application designed for quickly marking and generating attendance reports for the CSE-4 class. 

## 🚀 Features

- **Mobile-First Premium Design**: Uses a dark mode glassmorphism UI with vibrant accents and modern typography, optimized heavily for mobile and desktop screens.
- **Dynamic Interactions**: Features fluid cascading animations on load, custom animated checkboxes, and smooth transitions.
- **Smart Formatting**: Generates an exact text report of absent roll numbers. If no one is absent, it smartly outputs `all present`.
- **One-Click Copy**: A built-in modal (designed as a bottom-sheet on mobile devices) provides a 1-click button to copy the generated report directly to your clipboard.
- **Sticky Action Bar**: Ensures you never have to scroll back to the top/bottom on mobile to generate your report.

## 🛠️ Technologies Used

- **HTML5**: Semantic structure.
- **Vanilla CSS3**: Premium styling, custom animations, flexbox/grid layouts, and media queries for flawless mobile responsiveness.
- **Vanilla JavaScript (ES6)**: State management (tracking absentees via a `Set`), dynamic DOM manipulation, and clipboard API interaction. No external frameworks used.

## 💻 How to Use

Since this is a lightweight frontend-only application without any complex build steps, using it is incredibly simple:

1. Clone or download this repository.
2. Open the `index.html` file directly in any modern web browser.
3. Tap or click on the student cards to toggle their absent status.
4. Click the **Generate** button at the top to create the report.
5. Click **Copy** to copy the formatted text and paste it wherever needed!

## 🎓 Student Data

The tracker comes pre-configured with the specific roll numbers and names for CSE-4 students. The data is managed dynamically via an array in `app.js` and can be easily updated or expanded as needed simply by modifying the array.
