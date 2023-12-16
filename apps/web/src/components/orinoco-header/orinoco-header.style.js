import { pxToRem } from "@utils/style";

const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --header-width: 100%;
    --header-height: ${pxToRem(56)};
    --header-color-border: var(--color-shadow);

    display: block;
    width: var(--header-width);
    height: var(--header-height);
    border-bottom: 1px solid var(--header-color-border);
  }

  header {
    height: 100%;
  }

  orinoco-row {
    height: 100%;
  }
`);

export default componentStyles;
