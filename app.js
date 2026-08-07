// Global State
let currentSection = null;
let currentStudents = [];
let absentRollNumbers = new Set();

// DOM Elements
const sectionView = document.getElementById('section-view');
const attendanceView = document.getElementById('attendance-view');
const sectionGrid = document.getElementById('section-grid');

const studentListEl = document.getElementById('student-list');
const totalCountEl = document.getElementById('total-count');
const absentCountEl = document.getElementById('absent-count');
const currentSectionTitle = document.getElementById('current-section-title');

const backBtn = document.getElementById('back-btn');
const generateBtn = document.getElementById('generate-btn');
const modal = document.getElementById('report-modal');
const closeBtn = document.getElementById('close-btn');
const copyBtn = document.getElementById('copy-btn');
const reportOutput = document.getElementById('report-output');

function init() {
    renderSectionGrid();
}

function renderSectionGrid() {
    sectionGrid.innerHTML = '';
    
    // allStudentsData is loaded globally from data.js
    const sections = Object.keys(allStudentsData).sort();
    
    sections.forEach((section, index) => {
        const btn = document.createElement('div');
        btn.className = 'section-card';
        btn.style.animationDelay = `${index * 0.04}s`;
        
        btn.innerHTML = `
            <div class="section-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
            </div>
            <div class="section-details">
                <h3>${section}</h3>
                <p>${allStudentsData[section].length} Students</p>
            </div>
            <div class="section-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
        `;
        
        btn.onclick = () => openSection(section);
        sectionGrid.appendChild(btn);
    });
}

function openSection(sectionName) {
    currentSection = sectionName;
    currentStudents = allStudentsData[sectionName] || [];
    absentRollNumbers.clear();
    
    // Update UI
    currentSectionTitle.textContent = sectionName;
    totalCountEl.textContent = currentStudents.length;
    updateCounts();
    renderStudents();
    
    // Switch views
    sectionView.classList.add('hidden');
    attendanceView.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function renderStudents() {
    studentListEl.innerHTML = '';
    
    currentStudents.forEach((student, index) => {
        const card = document.createElement('div');
        card.className = `student-card ${absentRollNumbers.has(student.roll) ? 'absent' : ''}`;
        card.style.animationDelay = `${index * 0.03}s`;
        
        card.innerHTML = `
            <div class="student-info">
                <span class="student-roll">${student.roll}</span>
                <span class="student-name">${student.name}</span>
            </div>
            <div class="checkbox-wrapper">
                <input type="checkbox" ${absentRollNumbers.has(student.roll) ? 'checked' : ''} tabindex="-1">
                <span class="checkmark"></span>
            </div>
        `;

        card.addEventListener('click', () => toggleAttendance(student.roll, card));
        studentListEl.appendChild(card);
    });
}

function toggleAttendance(roll, cardElement) {
    if (absentRollNumbers.has(roll)) {
        absentRollNumbers.delete(roll);
        cardElement.classList.remove('absent');
        cardElement.querySelector('input').checked = false;
    } else {
        absentRollNumbers.add(roll);
        cardElement.classList.add('absent');
        cardElement.querySelector('input').checked = true;
    }
    updateCounts();
}

function updateCounts() {
    absentCountEl.textContent = absentRollNumbers.size;
}

function generateReport() {
    if (!currentSection) return;
    
    let report = "";
    
    if (absentRollNumbers.size === 0) {
        report = `${currentSection} : all present`;
    } else {
        report = `${currentSection} : absentee's\n`;
        const sortedAbsent = Array.from(absentRollNumbers).sort();
        report += sortedAbsent.join("\n");
    }
    
    reportOutput.value = report;
    modal.classList.remove('hidden');
}

function copyToClipboard() {
    reportOutput.select();
    document.execCommand('copy');
    
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.style.background = "var(--accent)";
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = "var(--success)";
    }, 2000);
}

function goBack() {
    attendanceView.classList.add('hidden');
    sectionView.classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Event Listeners
generateBtn.addEventListener('click', generateReport);
backBtn.addEventListener('click', goBack);
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
copyBtn.addEventListener('click', copyToClipboard);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Initialize app
init();
