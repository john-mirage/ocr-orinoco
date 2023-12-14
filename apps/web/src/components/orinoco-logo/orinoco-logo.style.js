const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --logo-camera-body-color: var(--md-sys-color-outline);
    --logo-camera-flash-color: var(--md-sys-color-outline-variant);
    --logo-text-color: var(--md-sys-color-on-surface);
    
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
