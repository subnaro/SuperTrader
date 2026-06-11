const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

const mouse = {
    x: null,
    y: null,
    radius: 120
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function getParticleAmount() {
    const isMobile = window.innerWidth < 768;
    return isMobile ? 55 : 130;
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

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }
    }

    draw() {
        ctx.fillStyle = "rgba(0, 255, 136, 0.75)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    particles = [];

    const amount = getParticleAmount();

    for (let i = 0; i < amount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 160) {
                const opacity = 1 - distance / 160;

                ctx.strokeStyle = `rgba(0, 255, 136, ${opacity * 0.08})`;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    mouseEffect();

    requestAnimationFrame(animate);
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

document.querySelectorAll(".link-btn, .socials a").forEach((item) => {
    item.addEventListener("click", (event) => {
        event.preventDefault();

        item.classList.add("clicked");

        setTimeout(() => {
            item.classList.remove("clicked");
        }, 250);
    });
});

resizeCanvas();
createParticles();
animate();