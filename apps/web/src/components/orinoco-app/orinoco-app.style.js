const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --app-background-color: var(--md-sys-color-background);
    
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
`);

export default componentStyles;
