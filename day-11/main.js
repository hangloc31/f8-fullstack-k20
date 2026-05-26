//Lay cac phan tu HTML can tuong tac
const openBtn = document.getElementById("open-menu");
const closeBtn = document.getElementById("close-menu");
const sideMenu = document.getElementById("side-menu");
const overlay = document.getElementById("overlay");
const darkModeToggle = document.getElementById("darkModeToggle");
const weatherIcon = document.getElementById("weatherIcon");

//Mo menu
function openNavbar() {
  sideMenu.classList.add("open");
  overlay.classList.add("show");
}
//Dong menu
function closeNavbar() {
  sideMenu.classList.remove("open");
  overlay.classList.remove("show");
}

//Chuyen doi Light/Dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  const iconEl = document.querySelector("#darkModeToggle svg");
  if (isDark) {
    iconEl.classList.remove("fa-cloud-moon");
    iconEl.classList.add("fa-sun");
  } else {
    iconEl.classList.remove("fa-sun");
    iconEl.classList.add("fa-cloud-moon");
  }
}

//Su kien khi nhan nut
openBtn.addEventListener("click", openNavbar);
closeBtn.addEventListener("click", closeNavbar);
darkModeToggle.addEventListener("click", toggleDarkMode);
