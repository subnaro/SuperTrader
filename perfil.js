// perfil.js

(function iniciarPerfil() {

    const icons = {
        calendar: `<svg viewBox="0 0 24 24"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/></svg>`,
        edit: `<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
        course: `<svg viewBox="0 0 24 24"><path d="M22 10 12 4 2 10l10 6 10-6Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>`,
        clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
        streak: `<svg viewBox="0 0 24 24"><path d="M12 2s5 5 5 10a5 5 0 0 1-10 0c0-5 5-10 5-10Z"/><path d="M12 14a2 2 0 0 0 2-2"/></svg>`,
        signal: `<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 16 0"/><path d="M8 12a4 4 0 0 1 8 0"/><circle cx="12" cy="12" r="1"/></svg>`,
        live: `<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="m10 9 5 3-5 3V9Z"/></svg>`,
        check: `<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>`,
        lock: `<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`,
        bell: `<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>`,
        telegram: `<svg viewBox="0 0 24 24"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7Z"/></svg>`,
        support: `<svg viewBox="0 0 24 24"><path d="M4 13a8 8 0 0 1 16 0"/><path d="M4 13v4a2 2 0 0 0 2 2h2v-6H4Z"/><path d="M20 13v4a2 2 0 0 1-2 2h-2v-6h4Z"/></svg>`,
        logout: `<svg viewBox="0 0 24 24"><path d="M10 17 15 12 10 7"/><path d="M15 12H3"/><path d="M21 3v18"/></svg>`
    };

    document.querySelectorAll("[data-icon]").forEach((el) => {
        const iconName = el.dataset.icon;

        if (icons[iconName]) {
            el.innerHTML = icons[iconName];
        }
    });

    const btnEditar = document.querySelector(".btn-outline");

    if (btnEditar) {
        btnEditar.addEventListener("click", () => {
            alert("Próximamente podrás editar tu perfil.");
        });
    }

    document.querySelectorAll(".setting-item").forEach((boton) => {

        boton.addEventListener("click", () => {

            const texto = boton.innerText;

            if (texto.includes("Cambiar contraseña")) {
                alert("Abrir módulo de cambio de contraseña");
            }

            else if (texto.includes("Notificaciones")) {
                alert("Abrir configuración de notificaciones");
            }

            else if (texto.includes("Telegram")) {
                window.open("https://t.me/", "_blank");
            }

            else if (texto.includes("Soporte")) {
                alert("Abrir soporte");
            }

            else if (texto.includes("Cerrar sesión")) {
                const confirmar = confirm("¿Deseas cerrar sesión?");

                if (confirmar) {
                    alert("Sesión cerrada");
                    // window.location.href = "login.html";
                }
            }

        });

    });

    const btnActividad = document.querySelector(".btn-link");

    if (btnActividad) {
        btnActividad.addEventListener("click", () => {
            alert("Próximamente podrás ver todo tu historial.");
        });
    }

})();