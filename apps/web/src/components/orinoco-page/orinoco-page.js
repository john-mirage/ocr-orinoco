import CartAPI from "@api/cart";
import { userAllowAnimation } from "@utils/user-preferences";
import componentTemplate from "./orinoco-page.template";
import componentStyles from "./orinoco-page.style";

const TO_LEFT = true;
const TO_RIGHT = false;

function* fadeAndSlideXKeyframes(toLeft) {
  if (typeof toLeft === "boolean") {
    yield [
      { opacity: 1, transform: "translateX(0)", offset: 0 },
      {
        opacity: 0,
        transform: toLeft ? "translateX(-4rem)" : "translateX(4rem)",
        offset: 1,
      },
    ];
    return [
      {
        opacity: 0,
        transform: toLeft ? "translateX(4rem)" : "translateX(-4rem)",
        offset: 0,
      },
      { opacity: 1, transform: "translateX(0)", offset: 1 },
    ];
  } else {
    throw new Error("The to left parameter must be a boolean");
  }
}

function* fadeKeyframes() {
  yield [
    { opacity: 1, offset: 0 },
    { opacity: 0, offset: 1 },
  ];
  return [
    { opacity: 0, offset: 0 },
    { opacity: 1, offset: 1 },
  ];
}

const animationTiming = {
  duration: 300,
  easing: "ease-in-out",
};

class OrinocoPage extends HTMLElement {
  #hasBeenMountedOnce = false;
  #keyframeEffect = new KeyframeEffect(this, null, animationTiming);
  #animation = new Animation(this.#keyframeEffect, document.timeline);
  #hasAnimation = false;
  #pageLevelDifference = 0;
  #webView;

  static get observedAttributes() {
    return ["current-page"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
    this.#webView = shadowRoot.querySelector("orinoco-view");
    this.handleViewFromCustomEvent = this.handleViewFromCustomEvent.bind(this);
  }

  get animation() {
    return this.#animation;
  }

  get #keyframes() {
    if (this.#pageLevelDifference < 0) {
      return fadeAndSlideXKeyframes(TO_LEFT);
    } else if (this.#pageLevelDifference > 0) {
      return fadeAndSlideXKeyframes(TO_RIGHT);
    } else {
      return fadeKeyframes();
    }
  }

  get hasAnimation() {
    return this.#hasAnimation && this.isConnected && userAllowAnimation();
  }

  set hasAnimation(hasAnimation) {
    const hasAnimationBoolean = !!hasAnimation;
    if (this.hasAnimation !== hasAnimationBoolean) {
      this.#hasAnimation = hasAnimationBoolean;
    }
  }

  get currentPage() {
    return this.getAttribute("current-page");
  }

  set currentPage(newCurrentPage) {
    if (typeof newCurrentPage === "string") {
      this.setAttribute("current-page", newCurrentPage);
    } else {
      this.removeAttribute("current-page");
    }
  }

  async #playAnimation(keyframes) {
    this.#keyframeEffect.setKeyframes(keyframes);
    this.#animation.play();
    try {
      await this.#animation.finished;
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }

  async #changeView(viewName) {
    console.log("current page has changed", viewName);
    if (typeof viewName === "string") {
      if (this.hasAnimation) {
        const keyframesGenerator = this.#keyframes;
        await this.#playAnimation(keyframesGenerator.next().value);
        this.#webView.currentView = viewName;
        await this.#playAnimation(keyframesGenerator.next().value);
      } else {
        this.#webView.currentView = viewName;
      }
    } else {
      this.#webView.currentView = undefined;
    }
  }

  #getPageLevel(pageName) {
    switch (pageName) {
      case "home":
        return 1;
      case "product":
        return 2;
      case "cart":
        return 3;
      case "not-found":
        return 4;
      default:
        return 0;
    }
  }

  #handleCartPage() {
    const numberOfCartItems = CartAPI.cart.length;
    if (numberOfCartItems > 0) {
      this.#changeView("cart");
    } else {
      const errorView = this.#webView.errorView;
      this.#changeView("error");
    }
  }

  #handleNotFoundPage() {
    const errorView = this.#webView.errorView;
    errorView.title = "Cette page n'existe pas";
    errorView.description =
      "Il semble que la page que vous recherchez n'existe pas, veuillez réessayer.";
    errorView.navigationLinkButton.label = "Revenir à l'acceuil";
    errorView.navigationLinkButton.href = "/orinoco/";
    errorView.button = errorView.navigationLinkButton;
    this.#changeView("error");
  }

  #handleCurrentPage(oldCurrentPage, newCurrentPage) {
    const oldPageLevel = this.#getPageLevel(oldCurrentPage);
    const newPageLevel = this.#getPageLevel(newCurrentPage);
    this.#pageLevelDifference = oldPageLevel - newPageLevel;
    if (newCurrentPage === "cart") {
      this.#handleCartPage();
    } else if (newCurrentPage === "not-found") {
      this.#handleNotFoundPage();
    } else {
      this.#changeView(newCurrentPage);
    }
  }

  #handleOrderViewFromCustomEvent(orderId) {
    if (typeof orderId === "string") {
      // todo
    } else {
      throw new TypeError("The order id is not a string");
    }
  }

  #handleErrorViewFromCustomEvent(title, description) {
    if (typeof title === "string" && typeof description === "string") {
      const errorView = this.#webView.errorView;
      errorView.title = title;
      errorView.description = description;
      errorView.navigationButton.label = "Recharger la page";
      errorView.navigationButton.page = this.currentPage;
      errorView.button = errorView.navigationButton;
    } else {
      throw new TypeError("The title and/or the description are not valid");
    }
  }

  handleViewFromCustomEvent(customEvent) {
    if (customEvent instanceof CustomEvent) {
      const view = customEvent.detail.view;
      if (typeof view === "string") {
        if (view === "order") {
          this.#handleOrderViewFromCustomEvent(customEvent.detail.orderId);
        } else if (view === "error") {
          this.#handleErrorViewFromCustomEvent(
            customEvent.detail.title,
            customEvent.detail.description
          );
        }
        this.hasAnimation = true;
        this.#pageLevelDifference = 0;
        this.#changeView(view);
      } else {
        throw new TypeError("The custom event view is not a string");
      }
    } else {
      throw new TypeError("The custom event is not valid");
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
      this.#upgradeProperty("hasAnimation");
      this.#upgradeProperty("currentPage");
      this.#hasBeenMountedOnce = true;
    }
    this.addEventListener("web-page-view", this.handleViewFromCustomEvent);
  }

  disconnectedCallback() {
    this.removeEventListener("web-page-view", this.handleViewFromCustomEvent);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "current-page": {
          this.#handleCurrentPage(oldValue, newValue);
          break;
        }
      }
    }
  }
}

customElements.define("orinoco-page", OrinocoPage);

export default OrinocoPage;
