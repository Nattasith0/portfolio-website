// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
    } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
    }
});

// Contact form handling
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Simple validation
    if (name && email && message) {
        alert("Thank you for your message! I will get back to you soon.");
        contactForm.reset();
    } else {
        alert("Please fill in all fields.");
    }
});

const translations = {
    en: {
        nav: {
            home1: "Portfolio",
            home: "Home",
            about: "About",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact"
        },
        hero: {
            title: "Hello, I'm <span class='highlight'>Nattasith</span>",
            subtitle: "Full Stack Developer",
            description: "I create beautiful and functional web applications",
            btnWork: "View My Work",
            btnContact: "Get In Touch"
        },
    },
    th: {
        nav: {
            home: "หน้าแรก",
            about: "เกี่ยวกับ",
            skills: "ทักษะ",
            projects: "ผลงาน",
            contact: "ติดต่อ"
        },
    }
};


document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        home: document.querySelector('a[href="#home"]'),
        about: document.querySelector('a[href="#about"]'),
        skills: document.querySelector('a[href="#skills"]'),
        projects: document.querySelector('a[href="#projects"]'),
        contact: document.querySelector('a[href="#contact"]')
    };
    const switchLanguage = (lang) => {
        const t = translations[lang];
        elements.home.textContent = t.nav.home;
        elements.about.textContent = t.nav.about;
        elements.skills.textContent = t.nav.skills;
        elements.projects.textContent = t.nav.projects;
        elements.contact.textContent = t.nav.contact;
    };
    document.getElementById("lang-en").addEventListener("click", () => {
        switchLanguage("en");
        document.getElementById("lang-en").classList.add("active");
        document.getElementById("lang-th").classList.remove("active");
    });
    document.getElementById("lang-th").addEventListener("click", () => {
        switchLanguage("th");
        document.getElementById("lang-th").classList.add("active");
        document.getElementById("lang-en").classList.remove("active");
    });
    switchLanguage("en");
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu .nav-link");
window.addEventListener("scroll", () => {
    let currentSectionId = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute("id");
        }
    });
    
    navLinks.forEach((link) => {
        link.classList.remove("active-link");
        if (link.getAttribute("href").includes(currentSectionId)) {
            link.classList.add("active-link");
        }
    });
});
