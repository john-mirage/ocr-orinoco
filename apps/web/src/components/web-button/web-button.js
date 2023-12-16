import classes from "./web-button.module.css";

class WebButton extends HTMLElement {
  #hasBeenMountedOnce = false;
  #labelElement = document.createElement("span");
  #buttonElement;
  #linkElement;

  static get observedAttributes() {
    return ["data-label"];
  }

  constructor() {
    super();
    this.#labelElement.classList.add(classes["web-button__label"]);
  }

  get buttonElement() {
    if (!this.#buttonElement) {
      const buttonElement = document.createElement("button");
      buttonElement.classList.add(classes["web-button__button"]);
      this.#buttonElement = buttonElement;
    }
    return this.#buttonElement;
  }

  get linkElement() {
    if (!this.#linkElement) {
      const linkElement = document.createElement("a");
      linkElement.classList.add(classes["web-button__button"]);
      this.#linkElement = linkElement;
    }
    return this.#linkElement;
  }

  get currentElement() {
    return this.firstElementChild ?? undefined;
  }

  set currentElement(newCurrentElement) {
    if (this.currentElement !== newCurrentElement) {
      if (newCurrentElement instanceof HTMLElement) {
        newCurrentElement.replaceChildren(this.#labelElement);
        this.replaceChildren(newCurrentElement);
      } else {
        this.replaceChildren();
      }
    }
  }

  get label() {
    return this.dataset.label;
  }

  set label(newLabel) {
    if (typeof newLabel === "string") {
      this.dataset.label = newLabel;
    } else {
      this.removeAttribute("data-label");
    }
  }

  #handleLabel(newLabel) {
    this.#labelElement.textContent = typeof newLabel === "string" ? newLabel : "";
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-button"]);
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "data-label": {
          this.#handleLabel(newValue);
          break;
        }
      }
    }
  }
}

export default WebButton;