const sidebar = document.getElementById("sidebar");
const menuMobile = document.getElementById("menuMobile");
const menuItems = document.querySelectorAll(".menu-item");
const moduloContenido = document.getElementById("moduloContenido");

// Archivos que va a cargar cada botón del menú
const modulos = {
  Dashboard: {
    html: "dashboard.html",
    css: "dashboard.css",
    js: "dashboard.js",
  },
  Cursos: {
    html: "cursos.html",
    css: "cursos.css",
    js: "cursos.js",
  },
  Señales: {
    html: "senales.html",
    css: "senales.css",
    js: "senales.js",
  },
  "En Vivo": {
    html: "envivo.html",
    css: "envivo.css",
    js: "envivo.js",
  },
  Membresía: {
    html: "membresia.html",
    css: "membresia.css",
    js: "membresia.js",
  },
  Perfil: {
    html: "perfil.html",
    css: "perfil.css",
    js: "perfil.js",
  },
};

// Menú mobile
menuMobile.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Cargar módulo
function cargarModulo(nombreModulo) {
  const modulo = modulos[nombreModulo];

  if (!modulo) {
    console.warn("No existe configuración para:", nombreModulo);
    return;
  }

  fetch(modulo.html)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`No se encontró ${modulo.html}`);
      }

      return response.text();
    })
    .then((html) => {
      moduloContenido.innerHTML = html;

      cargarCSS(modulo.css);
      cargarJS(modulo.js);
    })
    .catch((error) => {
      moduloContenido.innerHTML = `
        <div style="
          padding: 30px;
          color: white;
          background: #111;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 14px;
        ">
          <h2>Módulo no encontrado</h2>
          <p>Tenés que crear el archivo: <b>${modulo.html}</b></p>
        </div>
      `;

      console.error(error);
    });
}

// Cargar CSS sin repetirlo
function cargarCSS(rutaCSS) {
  const idCSS = `css-${rutaCSS}`;

  if (document.getElementById(idCSS)) return;

  const link = document.createElement("link");
  link.id = idCSS;
  link.rel = "stylesheet";
  link.href = rutaCSS;

  document.head.appendChild(link);
}

// Cargar JS reiniciando el módulo
function cargarJS(rutaJS) {
  const idJS = `js-${rutaJS}`;

  const scriptAnterior = document.getElementById(idJS);

  if (scriptAnterior) {
    scriptAnterior.remove();
  }

  const script = document.createElement("script");
  script.id = idJS;
  script.src = rutaJS;

  document.body.appendChild(script);
}

// Click en botones del menú
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems.forEach((btn) => btn.classList.remove("active"));
    item.classList.add("active");

    const nombreModulo = item.querySelector("b").textContent.trim();

    cargarModulo(nombreModulo);

    if (window.innerWidth <= 1000) {
      sidebar.classList.remove("active");
    }
  });
});

// Cerrar sidebar en mobile al tocar afuera
document.addEventListener("click", (event) => {
  const clickInsideSidebar = sidebar.contains(event.target);
  const clickOnMenuButton = menuMobile.contains(event.target);

  if (
    window.innerWidth <= 1000 &&
    !clickInsideSidebar &&
    !clickOnMenuButton
  ) {
    sidebar.classList.remove("active");
  }
});

// Cargar Dashboard por defecto al entrar
document.addEventListener("DOMContentLoaded", () => {
  cargarModulo("Dashboard");
});