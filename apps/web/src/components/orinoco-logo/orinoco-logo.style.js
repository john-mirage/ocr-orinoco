const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --_logo-camera-body-color: var(--md-sys-color-primary-container);
    --_logo-camera-flash-color: var(--md-sys-color-on-primary-container);
    --_logo-text-color: var(--md-sys-color-on-primary-container);
    
    display: block;
  }

  .icon {
    display: block;
    width: 122px;
    height: 32px;
  }

  .icon__camera-body {
    color: var(--_logo-camera-body-color);
  }

  .icon__camera-flash {
    color: var(--_logo-camera-flash-color);
  }

  .icon__text {
    color: var(--_logo-text-color);
  }
`);

export default componentStyles;
