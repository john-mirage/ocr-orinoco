const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --logo-camera-body-color: var(--color-logo-camera);
    --logo-camera-flash-color: var(--color-logo-camera-lens);
    --logo-text-color: var(--color-logo-typo);
    
    display: block;
  }

  .icon {
    display: block;
    width: 122px;
    height: 32px;
  }

  .icon__camera-body {
    color: var(--logo-camera-body-color);
  }

  .icon__camera-flash {
    color: var(--logo-camera-flash-color);
  }

  .icon__text {
    color: var(--logo-text-color);
  }
`);

export default componentStyles;
