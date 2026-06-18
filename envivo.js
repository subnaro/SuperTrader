// ===== TABS =====

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const tab = button.dataset.tab;

    // botones
    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    // contenido
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });

    document.getElementById(tab)?.classList.add("active");

  });

});


// ===== INFORMACIÓN DE LA CLASE =====

const btnInfoClase = document.getElementById("btnInfoClase");

btnInfoClase?.addEventListener("click", () => {

  alert(
`Apertura de New York

Profesor:
Gastón Orozco

Horario:
21:00 hs (GMT-3)

Duración aproximada:
90 minutos

Disponible para:
PRO / ELITE

Temas:
• Contexto del mercado
• Liquidez
• Entradas institucionales
• Gestión de riesgo
• Preguntas y respuestas`
  );

});


// ===== BOTÓN VER TODAS LAS SESIONES =====

const allSessionsBtn = document.querySelector(".all-sessions-btn");

allSessionsBtn?.addEventListener("click", () => {

  alert("Próximamente podrás ver el calendario completo.");

});


// ===== CALENDARIO =====

const calendarBtn = document.querySelector(".panel-header button");

calendarBtn?.addEventListener("click", () => {

  alert("Calendario de sesiones próximamente.");

});


// ===== PRÓXIMAS SESIONES =====

const nextSessions = document.querySelectorAll(".next-session");

nextSessions.forEach((card) => {

  card.addEventListener("mouseenter", () => {

    card.style.transform = "translateY(-3px)";

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});


// ===== DETECTAR VIDEO YOUTUBE =====

const iframe = document.querySelector(".youtube-frame iframe");

if (iframe) {

  console.log("Video cargado correctamente");

}


// ===== MENSAJE DE BIENVENIDA =====

console.log("Módulo En Vivo cargado");


// ===== ACTUALIZAR ESPECTADORES (SIMULACIÓN) =====

const viewersElement = document.querySelector(".viewers");

if (viewersElement) {

  let viewers = 2153;

  setInterval(() => {

    const random = Math.floor(Math.random() * 8) - 3;

    viewers += random;

    if (viewers < 2000) viewers = 2000;

    viewersElement.textContent =
      viewers.toLocaleString("es-AR") + " espectadores";

  }, 8000);

}