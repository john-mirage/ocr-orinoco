import CartAPI from "@api/cart-api";
import classes from "./web-router.module.css";

const HOME_ROUTE = "/orinoco/";
const PRODUCT_ROUTE = "/orinoco/produit";
const CART_ROUTE = "/orinoco/panier";

class WebRouter extends HTMLElement {
  #hasBeenMountedOnce = false;
  #webHeader = document.createElement("web-header");
  #webView = document.createElement("web-view");

  static get observedAttributes() {
    return ["data-href"];
  }

  constructor() {
    super();
    this.handleHrefFromPopStateEvent = this.handleHrefFromPopStateEvent.bind(this);
    this.handleHrefFromCustomEvent = this.handleHrefFromCustomEvent.bind(this);
  }

  get href() {
    return this.dataset.href;
  }

  set href(newHref) {
    if (typeof newHref === "string") {
      this.dataset.href = newHref;
    } else {
      this.removeAttribute("data-href");
    }
  }

  handleHomePage() {
    this.#webView.currentPage = this.#webView.homePage;
  }

  handleProductPage() {
    this.#webView.currentPage = this.#webView.productPage;
  }

  handleCartPage() {
    const numberOfCartItems = CartAPI.cart.length;
    if (numberOfCartItems > 0) {
      const cartPage = this.#webView.cartPage;
      this.#webView.currentPage = cartPage;
    } else {
      const errorPage = this.#webView.errorPage;
      errorPage.title = "Le panier est vide";
      errorPage.description = "Vous devez ajouter des articles avant de pouvoir voir cette page";
      errorPage.navigationLinkButton.label = "Revenir à l'acceuil";
      errorPage.navigationLinkButton.href = "/orinoco/";
      errorPage.button = errorPage.navigationLinkButton;
      errorPage.level = this.#webView.cartPage.level;
      this.#webView.currentPage = errorPage;
    }
  }

  handleNotFoundPage() {
    const errorPage = this.#webView.errorPage;
    errorPage.title = "Cette page n'existe pas";
    errorPage.description = "Il semble que la page que vous recherchez n'existe pas, veuillez réessayer.";
    errorPage.navigationLinkButton.label = "Revenir à l'acceuil";
    errorPage.navigationLinkButton.href = "/orinoco/";
    errorPage.button = errorPage.navigationLinkButton;
    this.#webView.currentPage = errorPage;
  }

  handleHref(newHref) {
    if (typeof newHref === "string") {
      const url = new URL(newHref);
      switch (url.pathname) {
        case HOME_ROUTE:    { this.handleHomePage(); break; }
        case PRODUCT_ROUTE: { this.handleProductPage(); break; }
        case CART_ROUTE:    { this.handleCartPage(); break; }
        default:            { this.handleNotFoundPage(); }
      }
    } else {
      this.#webView.currentPage = undefined;
    }
  }

  handleHrefFromPopStateEvent() {
    if (this.#webView.animation.playState === "running") this.#webView.animation.cancel();
    this.#webView.hasAnimation = false;
    this.href = window.location.href;
  }

  handleHrefFromCustomEvent(customEvent) {
    if (customEvent instanceof CustomEvent) {
      const { href } = customEvent.detail;
      if (typeof href === "string") {
        if (this.#webView.animation.playState !== "running") {
          window.history.pushState({}, "", href);
          this.#webView.hasAnimation = true;
          this.href = href;
        }
      } else {
        throw new Error("The custom event href is not valid");
      }
    } else {
      throw new Error("The custom event is not valid");
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-router"]);
      this.replaceChildren(this.#webHeader, this.#webView);
      this.#hasBeenMountedOnce = true;
    }
    window.addEventListener("popstate", this.handleHrefFromPopStateEvent);
    this.addEventListener("web-router-href", this.handleHrefFromCustomEvent);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.handleHrefFromPopStateEvent);
    this.removeEventListener("web-router-href", this.handleHrefFromCustomEvent);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "data-href": {
          this.handleHref(newValue);
          break;
        }
      }
    }
  }
}

export default WebRouter;
