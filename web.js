// ================= WEB JS =================

document.addEventListener("DOMContentLoaded", () => {
    activarMenu();
    scrollSuave();
    animarStats();
    animarEntradaSecciones();
    animarCardsFlotantes();
    configurarBotones();
    configurarModalCopyTrading();

    if (window.lucide) {
        lucide.createIcons();
    }
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
        ".hero-left, .hero-right, .stat-card, .titulo-programas, .programa-card, .brand-center, .market-card"
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
    const cards = document.querySelectorAll(".floating-card, .market-card");

    if (!cards.length) return;

    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.4}s`;
    });
}


// ================= BOTONES PRINCIPALES =================

function configurarBotones() {
    const btnAprende = document.querySelector("#btnAprende");
    const btnCopyTrading = document.querySelector("#btnCopyTrading");

    if (btnAprende) {
        btnAprende.addEventListener("click", () => {
            window.location.href = "academia.html";
        });
    }

    if (btnCopyTrading) {
        btnCopyTrading.addEventListener("click", () => {
            abrirModalCopyTrading();
        });
    }
}


// ================= MODAL COPY TRADING =================

function configurarModalCopyTrading() {
    const modal = document.querySelector("#modalCopy");
    const cerrar = document.querySelector("#cerrarModalCopy");
    const backdrop = document.querySelector("#modalCopyBackdrop");

    if (!modal) return;

    if (cerrar) {
        cerrar.addEventListener("click", cerrarModalCopyTrading);
    }

    if (backdrop) {
        backdrop.addEventListener("click", cerrarModalCopyTrading);
    }

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            cerrarModalCopyTrading();
        }
    });
}


async function abrirModalCopyTrading() {
    const modal = document.querySelector("#modalCopy");
    const contenido = document.querySelector("#copyTradingContent");

    if (!modal || !contenido) return;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (!contenido.dataset.loaded) {
        contenido.innerHTML = `
            <div class="copy-loading">
                Cargando Copy Trading...
            </div>
        `;

        try {
            await cargarCssCopyTrading();

            const respuesta = await fetch("copytrading.html");

            if (!respuesta.ok) {
                throw new Error("No se pudo cargar copytrading.html");
            }

            const html = await respuesta.text();
            contenido.innerHTML = html;
            contenido.dataset.loaded = "true";

            await cargarJsCopyTrading();

            if (window.lucide) {
                lucide.createIcons();
            }

        } catch (error) {
            console.error(error);

            contenido.innerHTML = `
                <div class="copy-error">
                    <h2>No se pudo cargar el módulo</h2>
                    <p>Revisá que existan los archivos copytrading.html, copytrading.css y copytrading.js.</p>
                </div>
            `;
        }
    }
}


function cerrarModalCopyTrading() {
    const modal = document.querySelector("#modalCopy");

    if (!modal) return;

    modal.classList.remove("active");
    document.body.style.overflow = "";
}


// ================= CARGA DINÁMICA COPYTRADING CSS =================

function cargarCssCopyTrading() {
    return new Promise(resolve => {
        const cssExistente = document.querySelector('link[data-copytrading-css="true"]');

        if (cssExistente) {
            resolve();
            return;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "copytrading.css";
        link.dataset.copytradingCss = "true";

        link.onload = () => resolve();
        link.onerror = () => resolve();

        document.head.appendChild(link);
    });
}


// ================= CARGA DINÁMICA COPYTRADING JS =================

function cargarJsCopyTrading() {
    return new Promise(resolve => {
        const jsExistente = document.querySelector('script[data-copytrading-js="true"]');

        if (jsExistente) {
            if (typeof iniciarCopyTrading === "function") {
                iniciarCopyTrading();
            }

            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = "copytrading.js";
        script.dataset.copytradingJs = "true";

        script.onload = () => {
            if (typeof iniciarCopyTrading === "function") {
                iniciarCopyTrading();
            }

            resolve();
        };

        script.onerror = () => resolve();

        document.body.appendChild(script);
    });
}