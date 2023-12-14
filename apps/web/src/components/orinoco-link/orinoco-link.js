import componentTemplate from "./orinoco-link.template";
import componentStyles from "./orinoco-link.style";

class OrinocoLink extends HTMLElement {
  #hasBeenMountedOnce = false;
  #linkElement;

  static get observedAttributes() {
    return ["href"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
    this.#linkElement = shadowRoot.querySelector("a");
    this.handleClick = this.handleClick.bind(this);
  }

  get href() {
    return this.getAttribute("href");
  }

  set href(newHref) {
    if (typeof newHref === "string") {
      this.setAttribute("href", newHref);
    } else {
      this.removeAttribute("href");
    }
  }

  #handleHref(newHref) {
    if (typeof newHref === "string") {
      this.#linkElement.setAttribute("href", newHref);
    } else {
      this.#linkElement.removeAttribute("href");
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

  handleClick(event) {
    event.preventDefault();
    const href = event.currentTarget.href;
    if (typeof href === "string") {
      const customEvent = new CustomEvent("web-app-href", {
        bubbles: true,
        composed: true,
        detail: { href },
      });
      this.dispatchEvent(customEvent);
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.#upgradeProperty("href");
      this.#hasBeenMountedOnce = true;
    }
    this.#linkElement.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.#linkElement.removeEventListener("click", this.handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "href": {
          this.#handleHref(newValue);
          break;
        }
      }
    }
  }
}

customElements.define("orinoco-link", OrinocoLink);

export default OrinocoLink;
