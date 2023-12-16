import { userAllowAnimation } from "@utils/user-preferences";
import classes from "./web-product-lightbox.module.css";

const overlayOpeningAnimationKeyframes = [
  { opacity: 0, offset: 0 },
  { opacity: 1, offset: 1 },
];

const overlayClosingAnimationKeyframes = [
  { opacity: 1, offset: 0 },
  { opacity: 0, offset: 1 },
];

const imageOpeningAnimationKeyframes = [
  { opacity: 0, transform: "scale(0.8)", offset: 0 },
  { opacity: 1, transform: "scale(1)", offset: 1 },
];

const imageClosingAnimationKeyframes = [
  { opacity: 1, transform: "scale(1)", offset: 0 },
  { opacity: 0, transform: "scale(0.8)", offset: 1 },
];

const animationOptions = {
  duration: 200,
  easing: "ease-in-out",
  fill: "backwards",
};

class WebProductLightbox extends HTMLElement {
  #hasBeenMountedOnce = false;
  #appElement = document.getElementById("app");
  #overlayElement = document.createElement("button");
  #webImage = document.createElement("web-image");
  #overlayKeyframeEffect = new KeyframeEffect(this.#overlayElement, null, animationOptions);
  #imageKeyframeEffect = new KeyframeEffect(this.#webImage, null, animationOptions);
  #overlayAnimation = new Animation(this.#overlayKeyframeEffect, document.timeline);
  #imageAnimation = new Animation(this.#imageKeyframeEffect, document.timeline);

  static get observedAttributes() {
    return ["data-visible", "data-src", "data-alt"];
  }

  constructor() {
    super();
    this.#overlayElement.classList.add(classes["web-product-lightbox__overlay"]);
    this.#webImage.classList.add(classes["web-product-lightbox__image"]);
    this.#overlayElement.setAttribute("disabled", "");
    this.#webImage.aspectRatio = "16 / 9";
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  get #hasAnimation() {
    return this.isConnected && userAllowAnimation();
  }

  get visible() {
    return this.hasAttribute("data-visible");
  }

  set visible(isVisible) {
    if (isVisible) {
      this.setAttribute("data-visible", "");
    } else {
      this.removeAttribute("data-visible");
    }
  }

  get src() {
    return this.dataset.src;
  }

  set src(newSrc) {
    if (typeof newSrc === "string") {
      this.dataset.src = newSrc;
    } else {
      this.removeAttribute("data-src");
    }
  }

  get alt() {
    return this.dataset.alt;
  }

  set alt(newAlt) {
    if (typeof newAlt === "string") {
      this.dataset.alt = newAlt;
    } else {
      this.removeAttribute("data-alt");
    }
  }

  async #playAnimations() {
    if (this.#hasAnimation) {
      this.#overlayAnimation.play();
      this.#imageAnimation.play();
      try {
        await Promise.all([this.#overlayAnimation.finished, this.#imageAnimation.finished]);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
  }

  async #handleVisibility(isVisible) {
    if (isVisible) {
      this.#overlayKeyframeEffect.setKeyframes(overlayOpeningAnimationKeyframes);
      this.#imageKeyframeEffect.setKeyframes(imageOpeningAnimationKeyframes);
      this.#appElement.after(this);
      await this.#playAnimations();
      this.#overlayElement.removeAttribute("disabled");
    } else {
      this.#overlayKeyframeEffect.setKeyframes(overlayClosingAnimationKeyframes);
      this.#imageKeyframeEffect.setKeyframes(imageClosingAnimationKeyframes);
      this.#overlayElement.setAttribute("disabled", "");
      await this.#playAnimations();
      this.remove();
    }
  }

  #handleSrc(newSrc) {
    this.#webImage.src = typeof newSrc === "string" ? newSrc : undefined;
  }

  #handleAlt(newAlt) {
    this.#webImage.alt = typeof newAlt === "string" ? newAlt : undefined;
  }

  handleOverlayClick() {
    this.visible = false;
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-product-lightbox"]);
      this.replaceChildren(this.#overlayElement, this.#webImage);
      this.#hasBeenMountedOnce = true;
    }
    this.#overlayElement.addEventListener("click", this.handleOverlayClick);
  }

  disconnectedCallback() {
    this.#overlayElement.removeEventListener("click", this.handleOverlayClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "data-visible": {
          this.#handleVisibility(typeof newValue === "string");
          break;
        }
        case "data-src": {
          this.#handleSrc(newValue);
          break;
        }
        case "data-alt": {
          this.#handleAlt(newValue);
          break;
        }
      }
    }
  }
}

export default WebProductLightbox;