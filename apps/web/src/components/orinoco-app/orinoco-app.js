import componentTemplate from "./orinoco-app.template";
import componentStyles from "./orinoco-app.style";

const HOME_ROUTE = "/";
const PRODUCT_ROUTE = "/produit";
const CART_ROUTE = "/panier";

class OrinocoApp extends HTMLElement {
  #hasBeenMountedOnce = false;
  #webPage;

  static get observedAttributes() {
    return ["href"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
    this.#webPage = shadowRoot.querySelector("orinoco-page");
    this.handleHrefFromPopStateEvent =
      this.handleHrefFromPopStateEvent.bind(this);
    this.handleHrefFromCustomEvent = this.handleHrefFromCustomEvent.bind(this);
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

  handleHref(newHref) {
    if (typeof newHref === "string") {
      const url = new URL(newHref);
      switch (url.pathname) {
        case HOME_ROUTE: {
          this.#webPage.currentPage = "home";
          break;
        }
        case PRODUCT_ROUTE: {
          this.#webPage.currentPage = "product";
          break;
        }
        case CART_ROUTE: {
          this.#webPage.currentPage = "cart";
          break;
        }
        default: {
          this.#webPage.currentPage = "not-found";
        }
      }
    } else {
      this.#webPage.currentPage = undefined;
    }
  }

  handleHrefFromPopStateEvent() {
    if (this.#webPage.animation.playState === "running")
      this.#webPage.animation.cancel();
    this.#webPage.hasAnimation = false;
    this.href = window.location.href;
  }

  handleHrefFromCustomEvent(customEvent) {
    if (customEvent instanceof CustomEvent) {
      const { href } = customEvent.detail;
      if (typeof href === "string") {
        if (this.#webPage.animation.playState !== "running") {
          window.history.pushState({}, "", href);
          this.#webPage.hasAnimation = true;
          this.href = href;
        }
      } else {
        throw new Error("The custom event href is not valid");
      }
    } else {
      throw new Error("The custom event is not valid");
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
      this.#upgradeProperty("href");
      this.#hasBeenMountedOnce = true;
    }
    window.addEventListener("popstate", this.handleHrefFromPopStateEvent);
    this.addEventListener("web-app-href", this.handleHrefFromCustomEvent);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleHrefFromPopStateEvent);
    this.removeEventListener("web-app-href", this.handleHrefFromCustomEvent);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "href": {
          this.handleHref(newValue);
          break;
        }
      }
    }
  }
}

customElements.define("orinoco-app", OrinocoApp);

export default OrinocoApp;
