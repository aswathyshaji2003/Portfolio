
/* =========================================
   ASWORA - INTERACTIVE JAVASCRIPT
   ========================================= */

// 1. MOBILE NAVIGATION
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("show");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.textContent = isOpen ? "×" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.textContent = "☰";
        });
    });

    document.addEventListener("click", event => {
        if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
            navLinks.classList.remove("show");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.textContent = "☰";
        }
    });
}

// 2. TYPING ANIMATION
const typingText = document.getElementById("typingText");

if (typingText) {
    const roles = [
        "Aspiring Software Developer",
        "Web Development Enthusiast",
        "Creative Thinker",
        "Problem Solver"
    ];

    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (!deleting) {
            charIndex++;
            typingText.textContent = currentRole.substring(0, charIndex);

            if (charIndex >= currentRole.length) {
                deleting = true;
                setTimeout(typeEffect, 1300);
                return;
            }
        } else {
            charIndex--;
            typingText.textContent = currentRole.substring(0, charIndex);

            if (charIndex <= 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(typeEffect, deleting ? 45 : 85);
    }

    setTimeout(typeEffect, 1200);
}

// 3. SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}

// 4. SMOOTH SCROLL FOR IN-PAGE LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto" : "smooth",
                block: "start"
            });
        }
    });
});

// 5. AUTOMATIC COPYRIGHT YEAR
const copyright = document.querySelector(".copyright");

if (copyright) {
    copyright.textContent =
        `© ${new Date().getFullYear()} ASWORA. ALL RIGHTS RESERVED.`;
}
