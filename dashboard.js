document.addEventListener("DOMContentLoaded", () => {
  cargarDashboard();
});

async function cargarDashboard() {
  const contenedor = document.getElementById("moduloContenido");

  if (!contenedor) return;

  try {
    const respuesta = await fetch("dashboard.html");

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar dashboard.html");
    }

    const html = await respuesta.text();
    contenedor.innerHTML = html;

    iniciarDashboard();
  } catch (error) {
    contenedor.innerHTML = `
      <section class="content-empty">
        <h1>Dashboard</h1>
        <p>No se pudo cargar el módulo dashboard.</p>
      </section>
    `;

    console.error(error);
  }
}

function iniciarDashboard() {
  const botones = document.querySelectorAll(".dashboard button");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      console.log("Acción dashboard:", boton.textContent.trim());
    });
  });
}