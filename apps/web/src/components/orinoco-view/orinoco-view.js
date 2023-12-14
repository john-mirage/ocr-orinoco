import componentTemplate from "./orinoco-view.template";
import componentStyles from "./orinoco-view.style";

class OrinocoView extends HTMLElement {
  #hasBeenMountedOnce = false;
  #viewMap = new Map();
  #mainElement;

  static get observedAttributes() {
    return ["current-view"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
    this.#mainElement = shadowRoot.querySelector("main");
  }

  get homeView() {
    return this.#getView("home");
  }

  get productView() {
    return this.#getView("product");
  }

  get cartView() {
    return this.#getView("cart");
  }

  get orderView() {
    return this.#getView("order");
  }

  get errorView() {
    return this.#getView("error");
  }

  get currentView() {
    return this.getAttribute("current-view");
  }

  set currentView(newCurrentView) {
    if (typeof newCurrentView === "string") {
      this.setAttribute("current-view", newCurrentView);
    } else {
      this.removeAttribute("current-view");
    }
  }

  #getView(viewName) {
    if (typeof viewName === "string") {
      if (!this.#viewMap.has(viewName)) {
        const view = document.createElement(`orinoco-${viewName}-view`);
        this.#viewMap.set(viewName, view);
      }
      return this.#viewMap.get(viewName);
    } else {
      throw new TypeError(
        `Invalid view name type, expected string but got: ${typeof viewName}`
      );
    }
  }

  #handleCurrentView(newCurrentView) {
    if (typeof newCurrentView === "string") {
      const view = this.#getView(newCurrentView);
      this.#mainElement.replaceChildren(view);
    } else {
      this.#mainElement.replaceChildren();
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
    if (!this.#hasBeenMountedOnce) {
      this.#upgradeProperty("currentView");
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "current-view": {
          this.#handleCurrentView(newValue);
          break;
        }
      }
    }
  }
}

customElements.define("orinoco-view", OrinocoView);

export default OrinocoView;
