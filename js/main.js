// ==========================================
// Dark Mode Toggle
// ==========================================
const darkModeToggle = document.getElementById('darkModeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Check for saved theme preference or default to system preference
const getSavedTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
};

// Initialize theme
const initTheme = () => {
    const theme = getSavedTheme();
    if (theme === 'dark') {
        html.classList.add('dark');
        themeIcon.textContent = '☀️';
    } else {
        html.classList.remove('dark');
        themeIcon.textContent = '🌙';
    }
};

// Toggle theme
const toggleTheme = () => {
    const isDark = html.classList.toggle('dark');
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    themeIcon.textContent = isDark ? '☀️' : '🌙';
};

darkModeToggle.addEventListener('click', toggleTheme);

// ==========================================
// Mobile Menu Toggle
// ==========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// ==========================================
// Intersection Observer for Fade-in Animation
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in-on-scroll elements
const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
fadeElements.forEach(el => observer.observe(el));

// ==========================================
// Active Navigation Link Highlight
// ==========================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

const updateActiveLink = () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ==========================================
// Copy Email to Clipboard
// ==========================================
const copyEmailBtn = document.getElementById('copyEmailBtn');
const toast = document.getElementById('toast');
const email = 'kangdh119@gmail.com';

const showToast = () => {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

copyEmailBtn.addEventListener('click', async () => {
    try {
        // Try using the modern Clipboard API
        await navigator.clipboard.writeText(email);
        showToast();
    } catch (err) {
        // Fallback: just show the email in an alert for manual copying
        console.warn('Clipboard API not available', err);
        alert(`Email: ${email}\n\nPlease copy it manually or click "Send Email" to open your mail client.`);
    }
});

// ==========================================
// Smooth Scroll Behavior (fallback for older browsers)
// ==========================================
if (!CSS.supports('scroll-behavior', 'smooth')) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ==========================================
// Initialize
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateActiveLink();
});

// ==========================================
// Prevent FOUC (Flash of Unstyled Content)
// ==========================================
document.documentElement.style.visibility = 'visible';
