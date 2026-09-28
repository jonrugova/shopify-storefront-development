if (!customElements.get('tm-image-switch')) {
  customElements.define(
    'tm-image-switch',
    class extends HTMLElement {
      connectedCallback() {
        this.buttons = Array.from(
          this.querySelectorAll('[data-tm-switch-button]')
        );
        this.panels = Array.from(
          this.querySelectorAll('[data-tm-switch-panel]')
        );

        this.buttons.forEach((button, index) => {
          button.addEventListener('click', () => this.activate(index));
          button.addEventListener('keydown', (event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

            event.preventDefault();
            const direction = event.key === 'ArrowRight' ? 1 : -1;
            const nextIndex =
              (index + direction + this.buttons.length) % this.buttons.length;
            this.activate(nextIndex);
            this.buttons[nextIndex].focus();
          });
        });

        this.activate(0);
      }

      activate(activeIndex) {
        this.buttons.forEach((button, index) => {
          button.setAttribute('aria-pressed', String(index === activeIndex));
        });

        this.panels.forEach((panel, index) => {
          panel.hidden = index !== activeIndex;
        });
      }
    }
  );
}
