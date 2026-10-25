
 // UniTrack About page JavaScript
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Apply the saved theme.
function applyTheme() {
    const isDark = localStorage.getItem("theme") === "dark";

    document.documentElement.toggleAttribute("data-theme", isDark);
    document.body.classList.toggle("dark-mode", isDark);

    if (themeToggle) {
        themeToggle.textContent = isDark ? "☀" : "☾";
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light theme" : "Switch to dark theme"
        );
    }
}

applyTheme();

// Toggle and save the theme.
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentlyDark = document.body.classList.contains("dark-mode");

        localStorage.setItem("theme", currentlyDark ? "light" : "dark");
        applyTheme();
    });
}

// Sync theme changes made in another browser tab.
window.addEventListener("storage", (event) => {
    if (event.key === "theme") {
        applyTheme();
    }
});

// Mobile navigation menu.
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open menu");
        });
    });
}

// Reveal content as it enters the viewport.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
} else {
    revealItems.forEach(item => item.classList.add("visible"));
}
