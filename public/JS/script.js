// State Variables
let subjects = JSON.parse(localStorage.getItem('ut_subj')) || ['OOPS', 'DBMS', 'Discrete Struct.'];
let tasks = JSON.parse(localStorage.getItem('ut_tasks')) || [
    { id: '1', title: 'OOPS Lab Assignment 1', subject: 'OOPS', priority: 'medium', dueDate: '2026-09-12', completed: false },
    { id: '2', title: 'DBMS ER Diagram', subject: 'DBMS', priority: 'high', dueDate: '2026-09-15', completed: true }
];

let timerSec = 25 * 60;
let timerInterval = null;
let isTimerRunning = false;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderSubjects();
    renderTasks();

    // Event Listeners
    document.getElementById('taskForm').addEventListener('submit', handleAddTask);
    document.getElementById('addSubBtn').addEventListener('click', handleAddSubject);
    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
    document.getElementById('filterStatus').addEventListener('change', renderTasks);

    // Timer Mode Listeners
    document.getElementById('workModeBtn').addEventListener('click', () => setTimerMode('work'));
    document.getElementById('breakModeBtn').addEventListener('click', () => setTimerMode('break'));
    document.getElementById('startTimerBtn').addEventListener('click', toggleTimer);
    document.getElementById('resetTimerBtn').addEventListener('click', resetTimer);
});

// Subject Functions
function renderSubjects() {
    const select = document.getElementById('taskSubject');
    const list = document.getElementById('subjList');
    select.innerHTML = '';
    list.innerHTML = '';

    subjects.forEach((s) => {
        select.innerHTML += `<option value="${s}">${s}</option>`;
        list.innerHTML += `
            <li class="subject-pill">
                ${s}
                <span onclick="removeSubject('${s}')">&times;</span>
            </li>
        `;
    });
    localStorage.setItem('ut_subj', JSON.stringify(subjects));
}

function handleAddSubject() {
    const input = document.getElementById('newSubInput');
    const val = input.value.trim();
    if (val && !subjects.includes(val)) {
        subjects.push(val);
        input.value = '';
        renderSubjects();
    }
}

function removeSubject(subjName) {
    subjects = subjects.filter(s => s !== subjName);
    renderSubjects();
}

// Task Functions
function handleAddTask(e) {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value.trim();
    const subject = document.getElementById('taskSubject').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;

    if (!title || !dueDate) return;

    tasks.push({
        id: Date.now().toString(),
        title,
        subject,
        priority,
        dueDate,
        completed: false
    });

    document.getElementById('taskTitle').value = '';
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    const filter = document.getElementById('filterStatus').value;
    list.innerHTML = '';
    
    let completedCount = 0;

    const filteredTasks = tasks.filter(t => {
        if (filter === 'completed') return t.completed;
        if (filter === 'pending') return !t.completed;
        return true;
    });

    tasks.forEach(t => { if (t.completed) completedCount++; });

    if (filteredTasks.length === 0) {
        list.innerHTML = `<p style="text-align:center; color: var(--text-secondary); padding: 20px;">No tasks found.</p>`;
    } else {
        filteredTasks.forEach(t => {
            list.innerHTML += `
                <div class="task-card-item ${t.completed ? 'completed' : ''}">
                    <div style="display: flex; align-items: center;">
                        <div class="checkbox-custom" onclick="toggleTask('${t.id}')">
                            ${t.completed ? '✓' : ''}
                        </div>
                        <div>
                            <strong>${t.title}</strong>
                            <div style="font-size: 11px; color: var(--text-secondary);">
                                📚 ${t.subject} • 📅 ${t.dueDate}
                            </div>
                        </div>
                    </div>
                    <button onclick="deleteTask('${t.id}')" style="border:none; background:none; cursor:pointer; color: var(--danger); font-size:16px;">✕</button>
                </div>
            `;
        });
    }

    // Update Dashboard Stats
const heroTotal = document.getElementById('heroTotal');
const heroDone = document.getElementById('heroDone');
const heroPending = document.getElementById('heroPending');
const heroPercent = document.getElementById('heroPercent');
const heroBar = document.getElementById('heroBar');

const percentage = tasks.length > 0
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

if (heroTotal) {
    heroTotal.textContent = tasks.length;
}

if (heroDone) {
    heroDone.textContent = completedCount;
}

if (heroPending) {
    heroPending.textContent = tasks.length - completedCount;
}

if (heroPercent) {
    heroPercent.textContent = percentage + '%';
}

if (heroBar) {
    heroBar.style.width = percentage + '%';
}

    localStorage.setItem('ut_tasks', JSON.stringify(tasks));
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

// Timer Functions
function toggleTimer() {
    const btn = document.getElementById('startTimerBtn');
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        btn.textContent = 'Start Session';
    } else {
        isTimerRunning = true;
        btn.textContent = 'Pause Session';
        timerInterval = setInterval(() => {
            if (timerSec > 0) {
                timerSec--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                alert('Session Completed! Take a break 🎉');
                resetTimer();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    document.getElementById('startTimerBtn').textContent = 'Start Session';
    const isWork = document.getElementById('workModeBtn').classList.contains('active');
    timerSec = isWork ? 25 * 60 : 5 * 60;
    updateTimerDisplay();
}

function setTimerMode(mode) {

    const workBtn = document.getElementById('workModeBtn');
    const breakBtn = document.getElementById('breakModeBtn');

    if (mode === 'work') {
        workBtn.classList.add('active');
        breakBtn.classList.remove('active');
        timerSec = 25 * 60;
    } else {
        breakBtn.classList.add('active');
        workBtn.classList.remove('active');
        timerSec = 5 * 60;
    }

    clearInterval(timerInterval);
    isTimerRunning = false;

    document.getElementById('startTimerBtn').textContent = 'Start Session';

    updateTimerDisplay();
}

function updateTimerDisplay() {
    const mins = Math.floor(timerSec / 60);
    const secs = timerSec % 60;
    document.getElementById('timerDisplay').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}



 // Dark Mode Toggle
function applyTheme() {
    const isDark = localStorage.getItem('theme') === 'dark';

    document.body.classList.toggle('dark-mode', isDark);

    const desktopButton = document.getElementById('themeToggleBtn');
    const mobileButton = document.getElementById('mobileThemeToggle');

    if (desktopButton) {
        desktopButton.textContent = isDark ? '☀' : '☼';
    }

    if (mobileButton) {
        mobileButton.textContent = isDark ? '☀' : '☼';
    }
}

function toggleTheme() {
    const isDark = !document.body.classList.contains('dark-mode');

    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    applyTheme();
}

// Restore saved theme when Tasks page loads
applyTheme();
