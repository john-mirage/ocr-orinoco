import classes from "./web-header.module.css";

class WebHeader extends HTMLElement {
  #hasBeenMountedOnce = false;
  #webContainer = document.createElement("web-container");
  #headerElement = document.createElement("header");
  #leftSectionElement = document.createElement("div");
  #rightSectionElement = document.createElement("div");
  #webLogo = document.createElement("web-logo");
  #webThemeSwitch = document.createElement("web-theme-switch");
  #webCartOverview = document.createElement("web-cart-overview");

  constructor() {
    super();
    this.#headerElement.classList.add(classes["web-header__row"]);
    this.#leftSectionElement.classList.add(classes["web-header__row-section"], classes["web-header__row-section--left"]);
    this.#rightSectionElement.classList.add(classes["web-header__row-section"], classes["web-header__row-section--right"]);
    this.#webThemeSwitch.classList.add(classes["web-header__theme-switch"]);
    this.#webContainer.replaceChildren(this.#headerElement);
    this.#headerElement.replaceChildren(this.#leftSectionElement, this.#rightSectionElement);
    this.#leftSectionElement.replaceChildren(this.#webLogo);
    this.#rightSectionElement.replaceChildren(this.#webThemeSwitch, this.#webCartOverview);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-header"]);
      this.replaceChildren(this.#webContainer);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebHeader;