import componentTemplate from "./orinoco-icon.template";
import componentStyles from "./orinoco-icon.style";

const ICON_SIZE_VAR = "--_icon-size";

class OrinocoIcon extends HTMLElement {
  #hasBeenCalledOnce = false;
  #iconMap = new Map();
  #iconContainer;

  static get observedAttributes() {
    return ["icon", "size"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
    this.#iconContainer = this.shadowRoot.querySelector("div");
  }

  get icon() {
    return this.getAttribute("icon");
  }

  set icon(newIcon) {
    if (typeof newIcon === "string") {
      this.setAttribute("icon", newIcon);
    } else {
      this.removeAttribute("icon");
    }
  }

  get size() {
    return this.getAttribute("size") ?? "1rem";
  }

  set size(newSize) {
    if (typeof newSize === "string") {
      this.setAttribute("size", newSize);
    } else {
      this.removeAttribute("size");
    }
  }

  #getIcon(iconName) {
    if (typeof iconName === "string") {
      if (!this.#iconMap.has(iconName)) {
        const template = document.getElementById(`template-icon-${iconName}`);
        const iconElement =
          template?.content?.firstElementChild?.cloneNode(true);
        if (iconElement) {
          this.#iconMap.set(iconName, iconElement);
        } else {
          throw new TypeError(
            `${iconName} icon template has not been defined or is not valid`
          );
        }
      }
      return this.#iconMap.get(iconName);
    } else {
      throw new TypeError(
        `Invalid icon type, expected string but got: ${typeof iconName}`
      );
    }
  }

  #handleIcon(iconName) {
    const iconElement = this.#getIcon(iconName);
    this.#iconContainer.replaceChildren(iconElement);
  }

  #handleSize(newSize) {
    if (typeof newSize === "string") {
      this.style.setProperty(ICON_SIZE_VAR, newSize);
    } else {
      this.style.removeProperty(ICON_SIZE_VAR);
    }
  }

  #upgradeProperty(propertyName) {
    if (typeof propertyName === "string") {
      if (this.hasOwnProperty(propertyName)) {
        let value = this[propertyName];
        delete this[propertyName];
        this[propertyName] = value;
      }
    } else {
      throw TypeError("The property name is not a string");
    }
  }

  connectedCallback() {
    if (!this.#hasBeenCalledOnce) {
      this.#upgradeProperty("icon");
      this.#upgradeProperty("size");
      this.#hasBeenCalledOnce = true;
    }
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    if (oldvalue !== newValue) {
      switch (name) {
        case "icon": {
          this.#handleIcon(newValue);
          break;
        }
        case "size": {
          this.#handleSize(newValue);
          break;
        }
      }
    }
  }
}

customElements.define("orinoco-icon", OrinocoIcon);

export default OrinocoIcon;
