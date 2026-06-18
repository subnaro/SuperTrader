// perfil.js

document.addEventListener("DOMContentLoaded", () => {

    // Editar perfil
    const btnEditar = document.querySelector(".btn-outline");

    if (btnEditar) {
        btnEditar.addEventListener("click", () => {
            alert("Próximamente podrás editar tu perfil.");
        });
    }

    // Botones de configuración
    const botones = document.querySelectorAll(".setting-item");

    botones.forEach((boton) => {

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


    // Ver toda la actividad
    const btnActividad = document.querySelector(".btn-link");

    if (btnActividad) {
        btnActividad.addEventListener("click", () => {
            alert("Próximamente podrás ver todo tu historial.");
        });
    }

});