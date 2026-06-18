/* ==========================
   CURSOS | SUPERTRADER
========================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");
const courseSelect = document.querySelector(".course-select");
const courseButtons = document.querySelectorAll(".course-btn");

/* ===== FILTROS POR BOTONES ===== */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    filterCourses(filter);

    if (courseSelect) {
      courseSelect.value = getSelectText(filter);
    }
  });
});

/* ===== FILTRO POR SELECT ===== */

if (courseSelect) {
  courseSelect.addEventListener("change", () => {
    const value = courseSelect.value.toLowerCase();

    let filter = "todos";

    if (value.includes("progreso")) filter = "progreso";
    if (value.includes("finalizados")) filter = "finalizado";
    if (value.includes("pendientes")) filter = "pendiente";

    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === filter);
    });

    filterCourses(filter);
  });
}

/* ===== FUNCIÓN GENERAL DE FILTRO ===== */

function filterCourses(filter) {
  courseCards.forEach((card) => {
    const status = card.dataset.status;

    if (filter === "todos" || status === filter) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

function getSelectText(filter) {
  const values = {
    todos: "Todos los cursos",
    progreso: "En progreso",
    finalizado: "Finalizados",
    pendiente: "Pendientes",
  };

  return values[filter] || "Todos los cursos";
}

/* ===== BOTONES DE CURSO ===== */

courseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.disabled) return;

    if (button.textContent.includes("Rendir prueba")) {
      alert("Prueba final disponible próximamente.");
      return;
    }

    alert("Reproductor del curso disponible próximamente.");
  });
});