// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
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
        nav: { home: "Home", about: "About", skills: "Skills", projects: "Projects", contact: "Contact" },
        hero: {
            h1: "Hi, I'm <span>Nattasit M.</span>", role: "Front-End Developer | UI/UX Enthusiast | Learner",
            work: "View My Work", resume: "Download Resume"
        },
        footer: "© 2025 Nattasith. Software Engineering, RMUTL. All rights reserved."
    },
    th: {
        nav: { home: "หน้าแรก", about: "เกี่ยวกับ", skills: "ทักษะ", projects: "ผลงาน", contact: "ติดต่อ" },
        hero: {
            h1: "สวัสดี ผมชื่อ <span>Nattasit M.</span>", role: "นักพัฒนา Front-End | สนใจ UI/UX | ชอบเรียนรู้",
            work: "ดูผลงาน", resume: "ดาวน์โหลดเรซูเม่"
        },
        footer: "© 2025 นัททสิทธิ์ สาขาวิศวกรรมซอฟต์แวร์ RMUTL สงวนลิขสิทธิ์"
    }
};


document.addEventListener("DOMContentLoaded", () => {
    const els = {
        nav: {
            home: document.querySelector('a[href="#home"]'),
            about: document.querySelector('a[href="#about"]'),
            skills: document.querySelector('a[href="#skills"]'),
            projects: document.querySelector('a[href="#projects"]'),
            contact: document.querySelector('a[href="#contact"]')
        },
        hero: {
            title: document.querySelector(".hero h1"),
            role: document.querySelector(".typewriter"),
            btnWork: document.querySelector('.hero-buttons a[href="#projects"]'),
            btnResume: document.querySelector('.hero-buttons a[download]')
        },
        footer: document.querySelector(".footer p")
    };

    const setLang = (lang) => {
        const t = translations[lang];
        Object.assign(els.nav.home, { textContent: t.nav.home });
        els.nav.about.textContent = t.nav.about;
        els.nav.skills.textContent = t.nav.skills;
        els.nav.projects.textContent = t.nav.projects;
        els.nav.contact.textContent = t.nav.contact;
        els.hero.title.innerHTML = t.hero.h1;
        els.hero.role.textContent = t.hero.role;
        els.hero.btnWork.firstChild && (els.hero.btnWork.lastChild.textContent = ` ${t.hero.work}`);
        els.hero.btnResume.lastChild.textContent = ` ${t.hero.resume}`;
        els.footer.textContent = t.footer;

        const enBtn = document.getElementById("lang-en");
        const thBtn = document.getElementById("lang-th");
        if (lang === "en") {
            enBtn.classList.add("active"); thBtn.classList.remove("active");
            enBtn.setAttribute("aria-pressed", "true"); thBtn.setAttribute("aria-pressed", "false");
            document.documentElement.lang = "en";
        } else {
            thBtn.classList.add("active"); enBtn.classList.remove("active");
            thBtn.setAttribute("aria-pressed", "true"); enBtn.setAttribute("aria-pressed", "false");
            document.documentElement.lang = "th";
        }
        localStorage.setItem("lang", lang);
    };

    document.getElementById("lang-en").addEventListener("click", () => setLang("en"));
    document.getElementById("lang-th").addEventListener("click", () => setLang("th"));
    setLang(localStorage.getItem("lang") || "en");
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu .nav-link");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.nav-menu .nav-link[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove("active-link"));
            link.classList.add("active-link");
            navLinks.forEach(l => l.removeAttribute("aria-current"));
            link.setAttribute("aria-current", "true");
        }
    });
}, { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 });

sections.forEach((s) => observer.observe(s));

const form = document.getElementById('contactForm');
const statusEl = form?.querySelector('.form-status');

function setError(input, msg) {
    const small = input.closest('.form-group').querySelector('.error');
    small.textContent = msg || '';
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
}

form?.addEventListener('input', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)) return;

    if (t.validity.valid) setError(t, '');
    else if (t.validity.valueMissing) setError(t, 'This field is required.');
    else if (t.validity.typeMismatch) setError(t, 'Please enter a valid value.');
    else if (t.validity.tooShort) setError(t, `Please enter at least ${t.minLength} characters.`);
});

form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.contact-submit');
    btn.disabled = true; statusEl.textContent = 'Sending...';

    await new Promise(r => setTimeout(r, 800));

    btn.disabled = false;
    form.reset();
    form.querySelectorAll('.error').forEach(el => el.textContent = '');
    statusEl.textContent = 'Thanks! Your message has been sent.';
    setTimeout(() => statusEl.textContent = '', 4000);
});