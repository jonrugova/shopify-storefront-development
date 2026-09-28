(() => {
  class TmSizeGuide extends HTMLElement {
    connectedCallback() {
      if (this.initialized) return;

      this.initialized = true;
      this.unitButtons = Array.from(this.querySelectorAll('[data-tm-size-unit]'));
      this.unitPanels = Array.from(this.querySelectorAll('[data-tm-unit-panel]'));
      this.onUnitClick = this.handleUnitClick.bind(this);

      this.unitButtons.forEach((button) => {
        button.addEventListener('click', this.onUnitClick);
      });

      const additionalMeasurements = this.querySelector('.tm-size-guide__additional');
      if (
        additionalMeasurements &&
        window.matchMedia('(max-width: 639px)').matches &&
        !window.Shopify?.designMode
      ) {
        additionalMeasurements.open = false;
      }

      this.showUnit(
        this.unitButtons.find((button) => button.getAttribute('aria-pressed') === 'true')
          ?.dataset.tmSizeUnit || 'cm'
      );
    }

    disconnectedCallback() {
      this.unitButtons?.forEach((button) => {
        button.removeEventListener('click', this.onUnitClick);
      });
      this.initialized = false;
    }

    handleUnitClick(event) {
      this.showUnit(event.currentTarget.dataset.tmSizeUnit);
    }

    showUnit(unit) {
      this.unitButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.tmSizeUnit === unit));
      });

      this.unitPanels.forEach((panel) => {
        panel.hidden = panel.dataset.tmUnitPanel !== unit;
      });
    }
  }

  if (!customElements.get('tm-size-guide')) {
    customElements.define('tm-size-guide', TmSizeGuide);
  }
})();
