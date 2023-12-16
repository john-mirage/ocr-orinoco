import classes from "./web-icon.module.css";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

const ICON_SIZE_VAR = "--_icon-size";
const ICON_COLOR_VAR = "--_icon-color";

class WebIcon extends HTMLElement {
  #hasBeenMountedOnce = false;
  #svgElement = document.createElementNS(SVG_NAMESPACE, "svg");
  #useElement = document.createElementNS(SVG_NAMESPACE, "use");

  constructor() {
    super();
    this.#svgElement.classList.add(classes["web-icon__icon"]);
    this.#svgElement.replaceChildren(this.#useElement);
  }

  static get observedAttributes() {
    return ["data-icon", "data-size", "data-color"];
  }

  get icon() {
    return this.dataset.icon;
  }

  set icon(newIcon) {
    if (typeof newIcon === "string") {
      this.dataset.icon = newIcon;
    } else {
      this.removeAttribute("data-icon");
    }
  }

  get size() {
    return this.dataset.size ?? "1rem";
  }

  set size(newSize) {
    if (typeof newSize === "string") {
      this.dataset.size = newSize;
    } else {
      this.removeAttribute("data-size");
    }
  }

  get color() {
    return this.dataset.color ?? "on-surface-variant";
  }

  set color(newColor) {
    if (typeof newColor === "string") {
      this.dataset.color = newColor;
    } else {
      this.removeAttribute("data-color");
    }
  }

  handleIcon(newIcon) {
    if (typeof newIcon === "string") {
      this.#useElement.setAttribute("href", `#icon-${newIcon}`);
    } else {
      this.#useElement.removeAttribute("href");
    }
  }

  handleSize(newSize) {
    if (typeof newSize === "string") {
      this.style.setProperty(ICON_SIZE_VAR, newSize);
    } else {
      this.style.removeProperty(ICON_SIZE_VAR);
    }
  }

  handleColor(newColor) {
    if (typeof newColor === "string") {
      this.style.setProperty(ICON_COLOR_VAR, `var(--md-sys-color-${newColor})`);
    } else {
      this.style.removeProperty(ICON_COLOR_VAR);
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-icon"]);
      this.replaceChildren(this.#svgElement);
      if (!this.size)
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    if (oldvalue !== newValue) {
      switch (name) {
        case "data-icon": {
          this.handleIcon(newValue);
          break;
        }
        case "data-size": {
          this.handleSize(newValue);
          break;
        }
        case "data-color": {
          this.handleColor(newValue);
          break;
        }
      }
    }
  }
}

export default WebIcon;