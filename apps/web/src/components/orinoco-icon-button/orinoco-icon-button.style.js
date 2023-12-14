const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --icon-button-background-color-hover: var(--md-sys-color-surface-2);
    --icon-button-color: var(--md-sys-color-on-surface-variant);
    --icon-button-color-hover: var(--md-sys-color-on-surface);
    --icon-button-transition-duration: 150ms;

    position: relative;
    display: block;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    background-color: transparent;
    color: var(--icon-button-color);
    border: none;
  }

  button:not(:disabled) {
    cursor: pointer;
  }

  .badge {
    position: absolute;
    top: -0.5rem;
    left: 1.75rem;
  }

  @media screen and (hover: hover) {
    button:hover {
      background-color: var(--icon-button-background-color-hover);
      color: var(--icon-button-color-hover);
    }
  }

  @media screen and (prefers-reduced-motion: no-preference) {
    button {
      transition-property: background-color, color;
      transition-duration: var(--icon-button-transition-duration);
    }
  }
`);

export default componentStyles;
