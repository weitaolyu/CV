(() => {
  "use strict";

  const PDF_TITLE = "Wei-Tao Lyu - Academic CV";

  const exportButtons = Array.from(
    document.querySelectorAll("[data-export-pdf]")
  );

  const exportStatus = document.getElementById("export-status");

  let isExporting = false;
  let originalDocumentTitle = null;

  // =========================
  // Footer year
  // =========================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  // =========================
  // Image fallback handling
  // =========================

  function updateImageState(image) {
    const shell = image.closest("[data-image-shell]");

    if (!shell || !image.complete) {
      return;
    }

    const isMissing = image.naturalWidth === 0;

    shell.classList.toggle("is-image-missing", isMissing);

    const fallback = shell.querySelector(
      ".portrait-fallback, .visual-fallback"
    );

    if (fallback) {
      // A failed image is replaced by its visible fallback.
      fallback.setAttribute(
        "aria-hidden",
        isMissing ? "false" : "true"
      );
    }
  }

  document
    .querySelectorAll("[data-fallback-image]")
    .forEach((image) => {
      image.addEventListener("load", () => {
        updateImageState(image);
      });

      image.addEventListener("error", () => {
        updateImageState(image);
      });

      // Also handle images already loaded or failed before this script ran.
      updateImageState(image);
    });

  // =========================
  // Export helpers
  // =========================

  function setStatus(message) {
    if (exportStatus) {
      exportStatus.textContent = message;
    }
  }

  function setExportBusy(busy) {
    exportButtons.forEach((button) => {
      button.disabled = busy;

      if (busy) {
        button.setAttribute("aria-busy", "true");
      } else {
        button.removeAttribute("aria-busy");
      }
    });
  }

  function usePrintTitle() {
    if (originalDocumentTitle === null) {
      originalDocumentTitle = document.title;
    }

    // Browsers commonly use this title as the suggested PDF filename.
    document.title = PDF_TITLE;
  }

  function restoreDocumentTitle() {
    if (originalDocumentTitle !== null) {
      document.title = originalDocumentTitle;
      originalDocumentTitle = null;
    }
  }

  /**
   * Wait for a promise, with a timeout so slow or unavailable
   * assets cannot block PDF export indefinitely.
   */
  function waitWithTimeout(promise, timeoutMs = 5000) {
    return new Promise((resolve, reject) => {
      const timer = window.setTimeout(resolve, timeoutMs);

      Promise.resolve(promise).then(
        (value) => {
          window.clearTimeout(timer);
          resolve(value);
        },
        (error) => {
          window.clearTimeout(timer);
          reject(error);
        }
      );
    });
  }

  /**
   * Wait for an image to finish loading and, where supported,
   * decoding. Failed images use the fallback instead.
   */
  async function prepareImage(image) {
    image.loading = "eager";

    if (!image.complete) {
      await new Promise((resolve) => {
        const finish = () => {
          image.removeEventListener("load", finish);
          image.removeEventListener("error", finish);
          resolve();
        };

        image.addEventListener("load", finish);
        image.addEventListener("error", finish);

        // Cover the case where loading finished while listeners
        // were being attached.
        if (image.complete) {
          finish();
        }
      });
    }

    if (
      image.naturalWidth > 0 &&
      typeof image.decode === "function"
    ) {
      try {
        await image.decode();
      } catch {
        // A decode failure must not block printing.
      }
    }

    updateImageState(image);
  }

  async function preparePrintAssets() {
    const images = Array.from(
      document.querySelectorAll("main img")
    );

    const imagePromises = images.map(prepareImage);

    const fontPromise = document.fonts
      ? document.fonts.ready.catch(() => {})
      : Promise.resolve();

    await waitWithTimeout(
      Promise.all([...imagePromises, fontPromise])
    );

    // Refresh fallbacks even if preparation reached its timeout.
    images.forEach(updateImageState);
  }

  function waitForRender() {
    return new Promise((resolve) => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(resolve);
      });
    });
  }

  function finishPrintSession() {
    restoreDocumentTitle();

    isExporting = false;
    setExportBusy(false);

    // Closing the print dialog does not tell us whether a PDF was
    // actually saved, so do not announce a successful download.
    setStatus("");
  }

  // =========================
  // Browser print lifecycle
  // =========================

  window.addEventListener("beforeprint", () => {
    // Also applies when the user prints with Ctrl+P / Command+P.
    usePrintTitle();

    document
      .querySelectorAll("[data-fallback-image]")
      .forEach(updateImageState);
  });

  window.addEventListener("afterprint", finishPrintSession);

  // Additional cleanup for browsers that expose print media changes.
  const printMedia = window.matchMedia("print");

  const handlePrintMediaChange = (event) => {
    if (!event.matches) {
      finishPrintSession();
    }
  };

  if (typeof printMedia.addEventListener === "function") {
    printMedia.addEventListener("change", handlePrintMediaChange);
  } else if (typeof printMedia.addListener === "function") {
    printMedia.addListener(handlePrintMediaChange);
  }

  // =========================
  // Export current webpage CV
  // =========================

  async function exportCV() {
    if (isExporting) {
      return;
    }

    if (typeof window.print !== "function") {
      setStatus("PDF export is unavailable in this browser.");

      window.alert(
        "PDF export is unavailable in this browser. " +
        "Please open this page in a browser that supports printing."
      );

      return;
    }

    isExporting = true;
    setExportBusy(true);

    setStatus("Preparing the current CV for PDF export.");

    try {
      await preparePrintAssets();

      usePrintTitle();

      await waitForRender();

      setStatus(
        "Opening the print dialog. Choose Save as PDF to export your CV."
      );

      window.print();

      // Keep the filename title until the print dialog closes.
      // Cleanup is handled by afterprint / print media events.
    } catch (error) {
      console.error("CV PDF export failed:", error);

      finishPrintSession();

      setStatus(
        "Unable to open PDF export. Use your browser's Print command."
      );

      window.alert(
        "Unable to open PDF export. " +
        "Please use Ctrl+P (Windows/Linux) or Command+P (macOS), " +
        "then choose Save as PDF."
      );
    }
  }

  exportButtons.forEach((button) => {
    button.addEventListener("click", exportCV);
  });
})();
