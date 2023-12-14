import { pxToRem } from "@utils/style";

const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --header-width: 100%;
    --header-height: ${pxToRem(56)};
    --header-background-color: var(--md-sys-color-surface);
    --header-box-shadow: none;
    --header-transition-duration: 150ms;

    display: block;
    width: var(--header-width);
    height: var(--header-height);
    background-color: var(--header-background-color);
    box-shadow: var(--header-box-shadow);
  }

  header {
    height: 100%;
  }

  orinoco-row {
    height: 100%;
  }
  
  @media screen and (prefers-reduced-motion: no-preference) {
    :host {
      transition-property: background-color;
      transition-duration: var(--header-transition-duration);
    }
  }
`);

export default componentStyles;
