const sidebar = document.getElementById("sidebar");
const menuMobile = document.getElementById("menuMobile");
const menuItems = document.querySelectorAll(".menu-item");

menuMobile.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems.forEach((btn) => btn.classList.remove("active"));
    item.classList.add("active");

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