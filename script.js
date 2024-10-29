function toggleMenu() {
  const links = document.querySelector(".header-links");
  const hamburger = document.getElementById("hamburger");
  links.classList.toggle("show");
  hamburger.classList.toggle("open");
}
