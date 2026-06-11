// ================= WEB JS =================

document.addEventListener("DOMContentLoaded", () => {
    activarMenu();
    scrollSuave();
    animarStats();
    animarEntradaSecciones();
    animarCardsFlotantes();
    botonesDemo();
});


// ================= MENÚ ACTIVO =================

function activarMenu() {
    const links = document.querySelectorAll(".menu a");

    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(item => item.classList.remove("activo"));
            link.classList.add("activo");
        });
    });
}


// ================= SCROLL SUAVE =================

function scrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", e => {
            const destino = document.querySelector(link.getAttribute("href"));

            if (!destino) return;

            e.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}


// ================= ANIMACIÓN MÉTRICAS =================

function animarStats() {
    const stats = document.querySelectorAll(".stat-card h2");

    if (!stats.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const stat = entry.target;
            stat.classList.add("stat-visible");

            observer.unobserve(stat);
        });
    }, {
        threshold: 0.4
    });

    stats.forEach(stat => observer.observe(stat));
}


// ================= APARICIÓN DE SECCIONES =================

function animarEntradaSecciones() {
    const elementos = document.querySelectorAll(
        ".hero-left, .hero-right, .stat-card, .titulo-programas, .programa-card"
    );

    if (!elementos.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.18
    });

    elementos.forEach(elemento => {
        elemento.classList.add("reveal");
        observer.observe(elemento);
    });
}


// ================= CARDS FLOTANTES =================

function animarCardsFlotantes() {
    const cards = document.querySelectorAll(".floating-card");

    if (!cards.length) return;

    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.4}s`;
    });
}


// ================= BOTONES =================

function botonesDemo() {
    const btnPrimary = document.querySelector(".btn-primary");
    const btnSecondary = document.querySelector(".btn-secondary");
    const btnRegister = document.querySelector(".btn-register");
    const btnLogin = document.querySelector(".btn-login");
    const btnOutline = document.querySelector(".btn-outline");

    if (btnPrimary) {
        btnPrimary.addEventListener("click", () => {
            console.log("Empieza tu camino");
        });
    }

    if (btnSecondary) {
        btnSecondary.addEventListener("click", () => {
            const programas = document.querySelector("#programas");

            if (programas) {
                programas.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

    if (btnRegister) {
        btnRegister.addEventListener("click", () => {
            console.log("Unirme ahora");
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener("click", () => {
            console.log("Acceder");
        });
    }

    if (btnOutline) {
        btnOutline.addEventListener("click", () => {
            const programas = document.querySelector("#programas");

            if (programas) {
                programas.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }
}