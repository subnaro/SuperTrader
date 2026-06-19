// ================= PARTICULAS =================

const canvas = document.getElementById("particles");
const ctx = canvas ? canvas.getContext("2d") : null;

let particles = [];

const mouse = {
    x: null,
    y: null,
    radius: 120
};

function resizeCanvas() {
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function getParticleAmount() {
    return window.innerWidth < 768 ? 55 : 130;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.8;
        this.speedX = Math.random() * 0.25 - 0.125;
        this.speedY = Math.random() * 0.25 - 0.125;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        if (!ctx) return;

        ctx.fillStyle = "rgba(0,255,136,.75)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    if (!canvas) return;

    particles = [];

    for (let i = 0; i < getParticleAmount(); i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    if (!ctx) return;

    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {

            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 160) {
                const opacity = 1 - distance / 160;

                ctx.strokeStyle = `rgba(0,255,136,${opacity * .08})`;
                ctx.lineWidth = 1;

                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function mouseEffect() {

    if (mouse.x === null || mouse.y === null) return;

    particles.forEach((particle) => {

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {

            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;

            particle.x -= Math.cos(angle) * force * 1.2;
            particle.y -= Math.sin(angle) * force * 1.2;
        }

    });
}

function animate() {

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    mouseEffect();

    requestAnimationFrame(animate);
}

function iniciarParticulas() {

    resizeCanvas();
    createParticles();
    animate();
}

window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
});

window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
});

// ================= CLICK =================

function configurarAnimacionClicks() {

    document.querySelectorAll(".link-btn,.socials a").forEach(item => {

        item.addEventListener("click", () => {

            item.classList.add("clicked");

            setTimeout(() => {
                item.classList.remove("clicked");
            }, 250);

        });

    });

}

// ================= COPY TRADING =================

function configurarModalCopyTrading() {

    const btnCopy = document.querySelector("#btnCopyTrading");
    const modal = document.querySelector("#modalCopy");
    const cerrar = document.querySelector("#cerrarModalCopy");
    const backdrop = document.querySelector("#modalCopyBackdrop");

    btnCopy?.addEventListener("click", abrirModalCopyTrading);
    cerrar?.addEventListener("click", cerrarModalCopyTrading);
    backdrop?.addEventListener("click", cerrarModalCopyTrading);

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && modal?.classList.contains("active")) {
            cerrarModalCopyTrading();
        }

    });

}

async function abrirModalCopyTrading() {

    const modal = document.querySelector("#modalCopy");
    const contenido = document.querySelector("#copyTradingContent");

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (contenido.dataset.loaded === "true") return;

    contenido.innerHTML = `
        <div class="copy-loading">
            Cargando Copy Trading...
        </div>
    `;

    try {

        await cargarCssCopyTrading();

        const respuesta = await fetch("copytrading.html");
        const html = await respuesta.text();

        contenido.innerHTML = html;
        contenido.dataset.loaded = "true";

        await cargarJsCopyTrading();

    } catch {

        contenido.innerHTML = `
            <div class="copy-error">
                <h2>No se pudo cargar el módulo</h2>
            </div>
        `;
    }
}

function cerrarModalCopyTrading() {

    document.querySelector("#modalCopy")?.classList.remove("active");
    document.body.style.overflow = "";

}

function cargarCssCopyTrading() {

    return new Promise(resolve => {

        if (document.querySelector('[data-copytrading-css="true"]')) {
            resolve();
            return;
        }

        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = "copytrading.css";
        link.dataset.copytradingCss = "true";

        link.onload = resolve;

        document.head.appendChild(link);

    });

}

function cargarJsCopyTrading() {

    return new Promise(resolve => {

        if (document.querySelector('[data-copytrading-js="true"]')) {

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

        document.body.appendChild(script);

    });

}

// ================= SOPORTE =================

function configurarSoporte() {

    const boton = document.getElementById("btnSoporte");
    const toast = document.getElementById("toastSoporte");

    if (!boton || !toast) return;

    boton.addEventListener("click", () => {

        toast.classList.add("active");

        setTimeout(() => {
            toast.classList.remove("active");
        }, 2500);

    });

}

// ================= INIT =================

document.addEventListener("DOMContentLoaded", () => {

    iniciarParticulas();
    configurarAnimacionClicks();
    configurarModalCopyTrading();
    configurarSoporte();

});