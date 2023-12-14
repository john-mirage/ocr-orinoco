const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .section {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .section--left {
    justify-content: flex-start;
  }
  
  .section--right {
    justify-content: flex-end;
  }
`);

export default componentStyles;
