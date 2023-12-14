const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    display: block;
  }
`);

export default componentStyles;
