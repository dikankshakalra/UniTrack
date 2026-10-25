import { useEffect, useState } from "react";

const features = [
  { icon: "📋", title: "Task Management", description: "Create, organize, edit, and manage assignments, exams, personal tasks, and study sessions in one place." },
  { icon: "📚", title: "Subject Organization", description: "Organize your academic work by subjects such as OOPS, DBMS, Discrete Structures, and FEE." },
  { icon: "🎯", title: "Focus Sessions", description: "Use focused study sessions to stay productive and make dedicated time for your academic work." }
];
const steps = [
  { number: "01", title: "Add your tasks", description: "Add assignments, exams, projects, and study sessions in one place." },
  { number: "02", title: "Plan your week", description: "Organize deadlines and study sessions to make your workload easier to manage." },
  { number: "03", title: "Track your progress", description: "See what you've completed and stay on top of your semester goals." }
];

function Navbar({ darkMode, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return <header className="navbar">
    <div className="container nav-container">
      <a className="logo" href="#home" onClick={closeMenu} aria-label="UniTrack home"><img src="/ASSETS/logo/UniTrack%20logo.png" alt="UniTrack logo" /></a>
      <nav className={`nav-links ${menuOpen ? "active" : ""}`} aria-label="Main navigation">
        <a className="active" href="#home" onClick={closeMenu}>Home</a>
        <a href="#features" onClick={closeMenu}>Features</a>
        <a href="/pages/task.html" onClick={closeMenu}>Tasks</a>
        <a href="/pages/about.html" onClick={closeMenu}>About</a>
        <a className="mobile-login" href="/pages/login.html" onClick={closeMenu}>Login</a>
        <a className="btn btn-primary mobile-get-started" href="/pages/register.html" onClick={closeMenu}>Get Started</a>
        <button className="theme-toggle mobile-theme-toggle" type="button" onClick={onToggleTheme} aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}>{darkMode ? "☀" : "☾"} Theme</button>
      </nav>
      <div className="nav-actions">
        <a className="login-link" href="/pages/login.html">Login</a>
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}>{darkMode ? "☀" : "☾"}</button>
        <a className="btn btn-primary" href="/pages/register.html">Get Started</a>
      </div>
      <button className="hamburger" type="button" onClick={() => setMenuOpen(open => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? "✕" : "☰"}</button>
    </div>
  </header>;
}

function DashboardPreview() {
  return <div className="hero-dashboard" aria-label="Example UniTrack dashboard preview">
    <div className="dashboard-window">
      <div className="dashboard-header"><div><p className="dashboard-small">Your study overview</p><h3>Welcome back!</h3></div><div className="dashboard-avatar" aria-hidden="true">U</div></div>
      <p className="preview-note">Dashboard preview · Sample data</p>
      <div className="dashboard-stats">
        <div className="stat-card"><span>Tasks</span><strong>24</strong></div>
        <div className="stat-card"><span>Completed</span><strong>15</strong></div>
        <div className="stat-card"><span>Pending</span><strong>9</strong></div>
      </div>
      <div className="mockup-section">
        <div className="section-heading"><h4>Example tasks</h4><a href="/pages/task.html">View all →</a></div>
        <div className="mock-task completed-task"><span className="task-check" aria-hidden="true">✓</span><div className="task-info"><strong>OOPS Assignment</strong><small>OOPS · Assignment</small></div><span className="priority medium">Medium</span></div>
        <div className="mock-task"><span className="task-check" aria-hidden="true"></span><div className="task-info"><strong>DBMS Project</strong><small>DBMS · Project</small></div><span className="priority high">High</span></div>
        <div className="mock-task"><span className="task-check" aria-hidden="true"></span><div className="task-info"><strong>DS Study Session</strong><small>Discrete Structures</small></div><span className="priority low">Low</span></div>
      </div>
      <div className="mockup-section"><div className="section-heading"><h4>Example progress</h4><strong>72%</strong></div><div className="progress-bar"><div className="progress-fill"></div></div></div>
    </div>
  </div>;
}

function Hero() {
  return <section className="hero" id="home"><div className="container hero-container">
    <div className="hero-content"><span className="hero-badge">✦ Your academic productivity system</span><h1>Plan.<br /><span>Track.</span><br />Achieve.</h1>
      <p>Organize your assignments, exams, deadlines, and study sessions — all in one place.</p>
      <div className="hero-buttons"><a className="btn btn-primary" href="/pages/register.html">Get Started</a><a className="btn btn-secondary" href="#features">Explore UniTrack →</a></div>
      <div className="hero-note">✦ Built for university students</div>
    </div><DashboardPreview />
  </div></section>;
}

function Features() {
  return <section className="features section" id="features"><div className="container">
    <div className="section-title"><span className="section-label">FEATURES</span><h2>Everything you need to stay on track</h2><p>UniTrack brings your tasks, deadlines, study plans, and academic progress together in one simple workspace.</p></div>
    <div className="features-grid">{features.map(feature => <article className="feature-card" key={feature.title}><div className="feature-icon" aria-hidden="true">{feature.icon}</div><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
  </div></section>;
}

function HowItWorks() {
  return <section className="steps section" id="how-it-works"><div className="container">
    <div className="section-title"><span className="section-label">SIMPLE WORKFLOW</span><h2>Stay organized without the stress.</h2><p>UniTrack keeps your academic life simple, focused, and easy to manage.</p></div>
    <div className="steps-grid">{steps.map(step => <article className="step" key={step.number}><div className="step-number">{step.number}</div><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>
  </div></section>;
}

function Footer() {
  return <footer className="footer" id="about"><div className="container footer-container">
    <div className="footer-brand"><a href="#home" className="logo"><img src="/ASSETS/logo/UniTrack%20logo.png" alt="UniTrack logo" /></a><p>Your personal academic productivity system.</p><p className="tagline">Plan. Track. Achieve.</p></div>
    <div className="footer-links"><div><h4>Product</h4><a href="#features">Features</a><a href="/pages/task.html">Tasks</a><a href="#how-it-works">How it works</a></div><div><h4>About</h4><a href="#about">About UniTrack</a><a href="mailto:hello@unitrack.example">Contact</a></div><div><h4>Account</h4><a href="/pages/login.html">Login</a><a href="/pages/register.html">Get Started</a></div></div>
  </div><div className="footer-bottom"><p>© 2026 UniTrack. All rights reserved.</p><p>Plan. Track. Achieve.</p></div></footer>;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem("theme") === "dark"; } catch { return false; }
  });
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    try { localStorage.setItem("theme", darkMode ? "dark" : "light"); } catch { /* Theme still works for this visit. */ }
  }, [darkMode]);
  return <><Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode(current => !current)} /><main><Hero /><Features /><HowItWorks /></main><Footer /></>;
}
