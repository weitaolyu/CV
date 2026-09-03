// Scroll-reveal animations + footer year
(function () {
  "use strict";

  // Tag animatable elements
  var targets = document.querySelectorAll(
    ".section-heading, .expertise-grid article, .publication-list li, " +
    ".timeline-item, .profile-panel, .research-visual, .skill-groups article, " +
    ".project-layout > div, .contact-layout > div"
  );
  targets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach(function (el) { observer.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Keep footer year current
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

  // Graceful image fallback: hide broken images
  document.querySelectorAll("[data-fallback-image]").forEach(function (img) {
    img.addEventListener("error", function () { img.style.display = "none"; });
  });
})();
