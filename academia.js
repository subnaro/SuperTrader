const sidebar = document.getElementById("sidebar");
const menuMobile = document.getElementById("menuMobile");
const menuItems = document.querySelectorAll(".menu-item");
const moduloContenido = document.getElementById("moduloContenido");

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

menuMobile.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

function cargarModulo(nombreModulo) {
  const modulo = modulos[nombreModulo];

  if (!modulo) return;

  moduloContenido.innerHTML = `
    <div class="module-loader">
      <div class="loader-ring"></div>
      <p>Cargando ${nombreModulo}...</p>
    </div>
  `;

  fetch(modulo.html)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`No se encontró ${modulo.html}`);
      }

      return response.text();
    })
    .then((html) => {
      cargarCSS(modulo.css, () => {
        moduloContenido.innerHTML = html;
        cargarJS(modulo.js);
      });
    })
    .catch((error) => {
      moduloContenido.innerHTML = `
        <div class="module-error">
          <h2>Módulo no encontrado</h2>
          <p>Tenés que crear el archivo: <b>${modulo.html}</b></p>
        </div>
      `;

      console.error(error);
    });
}

function cargarCSS(rutaCSS, callback) {
  const idCSS = `css-${rutaCSS}`;

  const cssExistente = document.getElementById(idCSS);

  if (cssExistente) {
    callback?.();
    return;
  }

  const link = document.createElement("link");

  link.id = idCSS;
  link.rel = "stylesheet";
  link.href = rutaCSS;

  link.onload = () => {
    callback?.();
  };

  link.onerror = () => {
    console.warn(`No se pudo cargar el CSS: ${rutaCSS}`);
    callback?.();
  };

  document.head.appendChild(link);
}

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

document.addEventListener("DOMContentLoaded", () => {
  cargarModulo("Dashboard");
});