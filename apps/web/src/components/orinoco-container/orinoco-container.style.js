import { pxToRem } from "@utils/style";

const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --container-padding-mobile: ${pxToRem(24)};
    --container-padding-desktop: ${pxToRem(48)};
    
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 100%;
    height: 100%;
    padding-left: var(--container-padding-mobile);
    padding-right: var(--container-padding-mobile);
  }

  @media screen and (min-width: 576px) {
    :host {
      max-width: 576px;
    }
  }

  @media screen and (min-width: 768px) {
    :host {
      max-width: 768px;
    }
  }

  @media screen and (min-width: 1024px) {
    :host {
      padding-left: var(--container-padding-desktop);
      padding-right: var(--container-padding-desktop);
      max-width: 1024px;
    }
  }

  @media screen and (min-width: 1280px) {
    :host {
      max-width: 1280px;
    }
  }
`);

export default componentStyles;
