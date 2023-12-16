import WebPage from "@components/web-page";
import { userAllowAnimation } from "@utils/user-preferences";
import classes from "./web-view.module.css";

const TO_LEFT = true;
const TO_RIGHT = false;

function* fadeAndSlideXKeyframes(toLeft) {
  if (typeof toLeft === "boolean") {
    yield [
      { opacity: 1, transform: "translateX(0)", offset: 0 },
      { opacity: 0, transform: toLeft ? "translateX(-4rem)" : "translateX(4rem)", offset: 1 },
    ];
    return [
      { opacity: 0, transform: toLeft ? "translateX(4rem)" : "translateX(-4rem)", offset: 0 },
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

class WebView extends HTMLElement {
  #hasBeenMountedOnce = false;
  #pageElement = document.createElement("main");
  #webFooter = document.createElement("web-footer");
  #keyframeEffect = new KeyframeEffect(this, null, animationTiming);
  #animation = new Animation(this.#keyframeEffect, document.timeline);
  #hasAnimation;
  #homePage;
  #productPage;
  #cartPage;
  #orderPage;
  #errorPage;
  #currentPage;

  constructor() {
    super();
    this.#pageElement.classList.add(classes["web-view__page"]);
    this.handleOrderPageFromCustomEvent = this.handleOrderPageFromCustomEvent.bind(this);
    this.handleErrorPageFromCustomEvent = this.handleErrorPageFromCustomEvent.bind(this);
    this.handlePageFromCustomEvent = this.handlePageFromCustomEvent.bind(this);
  }

  get homePage() {
    if (!this.#homePage) this.#homePage = document.createElement("web-home-page");
    return this.#homePage;
  }

  get productPage() {
    if (!this.#productPage) this.#productPage = document.createElement("web-product-page");
    return this.#productPage;
  }

  get cartPage() {
    if (!this.#cartPage) this.#cartPage = document.createElement("web-cart-page");
    return this.#cartPage;
  }

  get orderPage() {
    if (!this.#orderPage) this.#orderPage = document.createElement("web-order-page");
    return this.#orderPage;
  }

  get errorPage() {
    if (!this.#errorPage) this.#errorPage = document.createElement("web-error-page");
    return this.#errorPage;
  }

  get animation() {
    return this.#animation;
  }

  get hasAnimation() {
    return this.#hasAnimation && userAllowAnimation();
  }

  get currentPage() {
    return this.#currentPage;
  }

  set hasAnimation(hasAnimation) {
    const hasAnimationBoolean = !!hasAnimation;
    if (this.hasAnimation !== hasAnimationBoolean) {
      this.#hasAnimation = hasAnimationBoolean;
    }
  }

  set currentPage(newCurrentWebPage) {
    if (this.#currentPage !== newCurrentWebPage) {
      if (newCurrentWebPage instanceof WebPage) {
        this.handlePageTransition(this.#currentPage, newCurrentWebPage);
        this.#currentPage = newCurrentWebPage;
      } else {
        this.#currentPage = undefined;
        this.#pageElement.replaceChildren();
      }
    }
  }

  getAnimationKeyframes(levelDifference) {
    if (typeof levelDifference === "number") {
      if (levelDifference < 0) {
        return fadeAndSlideXKeyframes(TO_LEFT);
      } else if (levelDifference > 0) {
        return fadeAndSlideXKeyframes(TO_RIGHT);
      } else {
        return fadeKeyframes();
      }
    } else {
      throw new TypeError("The level difference is not a number");
    }
  }

  playAnimation(keyframes) {
    this.#keyframeEffect.setKeyframes(keyframes);
    this.#animation.play();
    return this.#animation.finished;
  }

  async handlePageTransition(oldPage, newPage) {
    if (newPage instanceof WebPage) {
      if (this.hasAnimation) {
        const levelDifference = (oldPage?.level ?? 0) - newPage.level;
        const keyframes = this.getAnimationKeyframes(levelDifference);
        try {
          if (this.#animation.playState === "running") await this.#animation.finished;
          await this.playAnimation(keyframes.next().value);
          this.#pageElement.replaceChildren(newPage);
          await this.playAnimation(keyframes.next().value);
        } catch (error) {
          if (error.name !== "AbortError") throw error;
        }
      } else {
        this.#pageElement.replaceChildren(newPage);
      }
    } else {
      throw new TypeError("The web page is not valid");
    }
  }

  handleOrderPageFromCustomEvent(customEvent) {
    if (customEvent instanceof CustomEvent) {
      this.currentPage = this.orderPage;
    } else {
      throw new TypeError("The custom event is not valid");
    }
  }

  handleErrorPageFromCustomEvent(customEvent) {
    if (customEvent instanceof CustomEvent) {
      const { title, description } = customEvent.detail;
      if (
        typeof title === "string" &&
        typeof description === "string"
      ) {
        const errorPage = this.errorPage;
        errorPage.title = title;
        errorPage.description = description;
        errorPage.navigationButton.label = "Recharger la page";
        errorPage.navigationButton.page = this.currentPage;
        errorPage.button = errorPage.navigationButton;
        errorPage.level = this.currentPage.level ?? 0;
        this.hasAnimation = true;
        this.currentPage = errorPage;
      } else {
        throw new TypeError("The custom event props are not valid");
      }
    } else {
      throw new TypeError("The custom event is not valid");
    }
  }

  handlePageFromCustomEvent(customEvent) {
    if (customEvent instanceof CustomEvent) {
      const { page } = customEvent.detail;
      if (page instanceof WebPage) {
        this.hasAnimation = true;
        this.currentPage = page;
      } else {
        throw new TypeError("The custom event page is not valid");
      }
    } else {
      throw new TypeError("The custom event is not valid");
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-view"]);
      this.replaceChildren(this.#pageElement, this.#webFooter);
      this.#hasBeenMountedOnce = true;
    }
    this.addEventListener("web-view-order-page", this.handleOrderPageFromCustomEvent);
    this.addEventListener("web-view-error-page", this.handleErrorPageFromCustomEvent);
    this.addEventListener("web-view-page", this.handlePageFromCustomEvent);
  }

  disconnectedCallback() {
    this.removeEventListener("web-view-order-page", this.handleOrderPageFromCustomEvent);
    this.removeEventListener("web-view-error-page", this.handleErrorPageFromCustomEvent);
    this.removeEventListener("web-view-page", this.handlePageFromCustomEvent);
  }
}

export default WebView;