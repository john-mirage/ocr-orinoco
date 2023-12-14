import { pxToRem } from "@utils/style";

const componentStyles = new CSSStyleSheet();

componentStyles.replaceSync(`
  :host {
    --_hero-margin: ${pxToRem(48)};
    --_hero-container-padding: ${pxToRem(48)};
    --_hero-container-background-color: var(--color-primary-container);
    --_hero-container-border-radius: ${pxToRem(16)};

    --_hero-title-max-width: 44rem;
    --_hero-title-font-stack: var(--md-sys-typescale-headline-large-font-family-name);
    --_hero-title-font-weight: var(--md-sys-typescale-headline-large-font-weight);
    --_hero-title-font-size: var(--md-sys-typescale-headline-large-font-size);
    --_hero-title-line-height: var(--md-sys-typescale-headline-large-line-height);
    --_hero-title-letter-spacing: var(--md-sys-typescale-headline-large-letter-spacing);
    --_hero-title-color: var(--md-sys-color-on-tertiary-container);

    --_hero-description-max-width: 40rem;
    --_hero-description-font-stack: var(--md-sys-typescale-body-large-font-family-name);
    --_hero-description-font-weight: var(--md-sys-typescale-body-large-font-weight);
    --_hero-description-font-size: var(--md-sys-typescale-body-large-font-size);
    --_hero-description-line-height: var(--md-sys-typescale-body-large-line-height);
    --_hero-description-letter-spacing: var(--md-sys-typescale-body-large-letter-spacing);
    --_hero-description-color: var(--md-sys-color-on-tertiary-container);
    --_hero-transition-duration: 150ms;

    margin-top: var(--_hero-margin);
    margin-bottom: var(--_hero-margin);
    display: block;
  }

  section {
    padding: var(--_hero-container-padding);
    background-color: var(--_hero-container-background-color);
    border-radius: var(--_hero-container-border-radius);
  }

  h1 {
    margin-bottom: ${pxToRem(24)};
    max-width: var(--_hero-title-max-width);
    font-family: var(--_hero-title-font-stack);
    font-weight: var(--_hero-title-font-weight);
    font-size: var(--_hero-title-font-size);
    line-height: var(--_hero-title-line-height);
    letter-spacing: var(--_hero-title-letter-spacing);
    color: var(--_hero-title-color);
  }

  p {
    margin-bottom: ${pxToRem(32)};
    max-width: var(--_hero-description-max-width);
    font-family: var(--_hero-description-font-stack);
    font-weight: var(--_hero-description-font-weight);
    font-size: var(--_hero-description-font-size);
    line-height: var(--_hero-description-line-height);
    letter-spacing: var(--_hero-description-letter-spacing);
    color: var(--_hero-description-color);
  }
  
  @media screen and (prefers-reduced-motion: no-preference) {
    :host {
      transition-property: background-color;
      transition-duration: var(--_hero-transition-duration);
    }
  }
`);

export default componentStyles;
