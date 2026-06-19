// ================= COPYTRADING JS =================

function iniciarCopyTrading() {
    configurarBotonSuscripcion();

    if (window.lucide) {
        lucide.createIcons();
    }
}


// ================= BOTÓN SUSCRIPCIÓN =================

function configurarBotonSuscripcion() {
    const btn = document.querySelector("#btnSuscribirmeCopy");

    if (!btn) return;

    btn.addEventListener("click", () => {

        mostrarMensajeProximamente();

    });
}


// ================= MENSAJE PRÓXIMAMENTE =================

function mostrarMensajeProximamente() {

    // evitar duplicados
    if (document.querySelector(".copy-toast")) return;

    const toast = document.createElement("div");

    toast.className = "copy-toast";

    toast.innerHTML = `
        <div class="copy-toast-card">
            <div class="copy-toast-icon">
                ⏳
            </div>

            <div class="copy-toast-text">
                <h4>Próximamente</h4>
                <p>Las suscripciones al Copy Trading estarán disponibles muy pronto.</p>
            </div>
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("visible");
    }, 50);

    setTimeout(() => {

        toast.classList.remove("visible");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 3000);
}