const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --app-background-color: var(--color-background);
    --app-transition-duration: 150ms;
    
    display: block;
    overflow: hidden;
    background-color: var(--app-background-color);
  }

  orinoco-header {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
  }

  @media screen and (prefers-reduced-motion: no-preference) {
    :host {
      transition-property: background-color;
      transition-duration: var(--app-transition-duration);
    }
  }
`);

export default componentStyles;
