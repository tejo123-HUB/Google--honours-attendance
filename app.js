const studentsData = [
    { name: "ANNE RUTHVIK", roll: "25EU004202" },
    { name: "BANTU MEGHANA", roll: "25EU004203" },
    { name: "BUSIREDDY ARCHANA", roll: "25EU004207" },
    { name: "CHERUKURI NAGA SAI HARSHINI", roll: "25EU004209" },
    { name: "KATTA VENKATA NAGA SAI KARTHIK", roll: "25EU004221" },
    { name: "MAJJI NIHARIKA", roll: "25EU004226" },
    { name: "MANUGURI BHUVANA KRUTHI", roll: "25EU004230" },
    { name: "MEDASANI TEJO RAVI RAM", roll: "25EU004231" },
    { name: "MENDU MOHAN PRAMOADH", roll: "25EU004233" },
    { name: "MOHAMMAD ARIF", roll: "25EU004234" },
    { name: "NAGUMOTHU VISHNU VARDHAN", roll: "25EU004239" },
    { name: "NUNNA TANMAYI MEGHANA", roll: "25EU004240" },
    { name: "RAGA SRUTHI", roll: "25EU004243" },
    { name: "SINGAMSETTY BHARATH SAI RAM", roll: "25EU004251" },
    { name: "SYED KHAZA MOHINUDDIN", roll: "25EU004255" },
    { name: "VEDASRI NAARISETTI", roll: "25EU004262" }
];

let absentRollNumbers = new Set();

const studentListEl = document.getElementById('student-list');
const totalCountEl = document.getElementById('total-count');
const absentCountEl = document.getElementById('absent-count');
const generateBtn = document.getElementById('generate-btn');
const modal = document.getElementById('report-modal');
const closeBtn = document.getElementById('close-btn');
const copyBtn = document.getElementById('copy-btn');
const reportOutput = document.getElementById('report-output');

function init() {
    totalCountEl.textContent = studentsData.length;
    renderStudents();
}

function renderStudents() {
    studentListEl.innerHTML = '';
    
    studentsData.forEach((student, index) => {
        const card = document.createElement('div');
        card.className = `student-card ${absentRollNumbers.has(student.roll) ? 'absent' : ''}`;
        card.style.animationDelay = `${index * 0.03}s`;
        
        card.innerHTML = `
            <div class="student-info">
                <span class="student-name">${student.name}</span>
                <span class="student-roll">${student.roll}</span>
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
    let report = "CSE - 4\n";
    
    if (absentRollNumbers.size === 0) {
        report += "all present";
    } else {
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

// Event Listeners
generateBtn.addEventListener('click', generateReport);
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
