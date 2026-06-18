/* ==========================
   SEÑALES | SUPERTRADER
========================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const signalRows = document.querySelectorAll(".signal-row");
const exportButton = document.querySelector(".export-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    signalRows.forEach((row) => {
      const status = row.dataset.status;

      if (filter === "todas" || status === filter) {
        row.style.display = "grid";
      } else {
        row.style.display = "none";
      }
    });
  });
});

if (exportButton) {
  exportButton.addEventListener("click", () => {
    alert("Exportación de señales disponible próximamente.");
  });
}