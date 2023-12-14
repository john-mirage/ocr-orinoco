import { pxToRem } from "@utils/style";

const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --icon-size: ${pxToRem(16)};

    display: block;
    overflow: hidden;
  }

  div {
    width: var(--_icon-size);
    height: var(--_icon-size);
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`);

export default componentStyles;
