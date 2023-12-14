import { pxToRem } from "@utils/style";

const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --footer-border-size: ${pxToRem(1)};
    --footer-border-style: solid;
    --footer-border-color: var(--md-sys-color-outline-variant);
    --footer-height: ${pxToRem(64)};
    display: block;
    height: var(--footer-height);
    border-top: var(--footer-border-size) var(--footer-border-style) var(--footer-border-color);
  }

  footer {
    height: 100%;
  }

  orinoco-row {
    height: 100%;
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }
`);

export default componentStyles;
