const navbar = document.querySelector(".obito-navbar");

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // activate Akatsuki mode
  if (currentScroll > 120) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // fade in / out
  if (currentScroll > lastScroll && currentScroll > 200) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }

  lastScroll = currentScroll;
});
