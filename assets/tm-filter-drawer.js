document.addEventListener(
  "click",
  (event) => {
    if (!(event.target instanceof Element) || !event.target.closest("[data-filter-apply]")) return;

    event.preventDefault();
    window.Alpine?.store("modals")?.close("filters");
  },
  true
);
