import { pxToRem } from "@utils/style";

const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --_button-height: ${pxToRem(48)};
    --_button-padding: ${pxToRem(8)} ${pxToRem(24)};
    --_button-border-radius: 9999px;
    --_button-background-color: var(--color-primary);
    --_button-color: var(--color-on-primary);
    --_button-font-family: var(--md-sys-typescale-label-medium-font-family-name);
    --_button-font-weigth: var(--md-sys-typescale-label-medium-font-weight);
    --_button-font-size: var(--md-sys-typescale-label-medium-font-size);
    --_button-line-height: var(--md-sys-typescale-label-medium-line-height);
    --_button-letter-spacing: var(--md-sys-typescale-label-medium-letter-spacing);
    --_button-transition-duration: 150ms;
    
    display: block;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: var(--_button-height);
    padding: var(--_button-padding);
    border-radius: var(--_button-border-radius);
    background-color: var(--_button-background-color);
    font-family: var(--_button-font-family);
    font-weight: var(--_button-font-weigth);
    font-size: var(--_button-font-size);
    line-height: var(--_button-line-height);
    letter-spacing: var(--_button-letter-spacing);
    text-transform: uppercase;
    color: var(--_button-color);
    border: none;
  }
  
  @media screen and (prefers-reduced-motion: no-preference) {
    .button {
      transition-property: background-color;
      transition-duration: var(--_button-transition-duration);
    }
  }
`);

export default componentStyles;
