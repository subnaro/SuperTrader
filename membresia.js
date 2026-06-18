// ===== ELEMENTOS =====

const paymentModal = document.getElementById("paymentModal");
const closeModal = document.getElementById("closeModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const cancelPayment = document.getElementById("cancelPayment");

const modalPlan = document.getElementById("modalPlan");
const modalPrice = document.getElementById("modalPrice");

const walletAddress = document.getElementById("walletAddress");
const copyWallet = document.getElementById("copyWallet");

const toast = document.getElementById("toast");


// ===== ABRIR MODAL DE PAGO =====

document.querySelectorAll(".pay-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        const plan = btn.dataset.plan;
        const price = btn.dataset.price;

        modalPlan.textContent = plan;
        modalPrice.textContent = price;

        paymentModal.classList.add("active");
    });

});


// ===== CERRAR MODAL =====

function closePaymentModal() {
    paymentModal.classList.remove("active");
}

closeModal?.addEventListener("click", closePaymentModal);
modalCloseBtn?.addEventListener("click", closePaymentModal);
cancelPayment?.addEventListener("click", closePaymentModal);


// ===== COPIAR DIRECCIÓN USDT =====

copyWallet?.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(walletAddress.value);

        showToast("Dirección copiada");

    } catch {

        showToast("No se pudo copiar");

    }

});


// ===== COPIAR TXID =====

document.querySelectorAll(".copy-btn").forEach(btn => {

    btn.addEventListener("click", async () => {

        const value = btn.dataset.copy;

        try {

            await navigator.clipboard.writeText(value);

            showToast("TXID copiado");

        } catch {

            showToast("Error al copiar");

        }

    });

});


// ===== SCROLL HISTORIAL =====

const btnScrollHistory = document.getElementById("btnScrollHistory");
const paymentsHistory = document.getElementById("paymentsHistory");

btnScrollHistory?.addEventListener("click", () => {

    paymentsHistory.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// ===== CONFIRMAR PAGO =====

const confirmPayment = document.getElementById("confirmPayment");

confirmPayment?.addEventListener("click", () => {

    closePaymentModal();

    showToast("Pago enviado para revisión");

});


// ===== TOAST =====

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ===== BOTONES VER DETALLES =====

document.querySelectorAll(".details-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        showToast("Próximamente");

    });

});


// ===== ESC CERRAR MODAL =====

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closePaymentModal();

    }

});


// ===== CERRAR MODAL HACIENDO CLICK FUERA =====

window.addEventListener("click", e => {

    if (e.target === paymentModal) {

        closePaymentModal();

    }

});