document.documentElement.classList.add("js");

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear().toString();
}

document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") === "#") {
      event.preventDefault();
    }
  });
});

document.querySelectorAll("img[data-fallback-image]").forEach((image) => {
  image.addEventListener("error", () => {
    image.hidden = true;
    const shell = image.closest("[data-image-shell]");
    if (shell) {
      shell.classList.add("missing-image");
    }
  });
});
