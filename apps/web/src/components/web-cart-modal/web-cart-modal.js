import { userAllowAnimation } from "@utils/user-preferences";
import classes from "./web-cart-modal.module.css";

const modalOpeningAnimationKeyframes = [
  { opacity: 0, transform: "translateY(-1rem)", offset: 0 },
  { opacity: 1, transform: "translateY(0)", offset: 1 },
];

const modalClosingAnimationKeyframes = [
  { opacity: 1, transform: "translateY(0)", offset: 0 },
  { opacity: 0, transform: "translateY(-1rem)", offset: 1 },
];

const modalAnimationOptions = {
  duration: 200,
  easing: "ease-in-out",
}

class WebCartModal extends HTMLElement {
  #hasBeenMountedOnce = false;
  #surfaceElement = document.createElement("div");
  #keyframeEffect = new KeyframeEffect(this, null, modalAnimationOptions);
  #animation = new Animation(this.#keyframeEffect, document.timeline);
  #container;

  static get observedAttributes() {
    return ["data-visible"];
  }

  constructor() {
    super();
    this.#surfaceElement.classList.add(classes["web-cart-modal__surface"]);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  get animationIsRunning() {
    return this.#animation.playState === "running";
  }

  get #hasAnimation() {
    return this.isConnected && userAllowAnimation();
  }

  get container() {
    if (this.#container instanceof HTMLElement) {
      return this.#container;
    } else {
      throw new TypeError("The container is not defined");
    }
  }

  set container(newContainer) {
    if (this.#container !== newContainer) {
      if (newContainer instanceof HTMLElement) {
        this.#container = newContainer;
      } else {
        throw new TypeError("The new container is not valid");
      }
    }
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

  async #playAnimation() {
    if (this.#hasAnimation) {
      this.#animation.play();
      try {
        await this.#animation.finished;
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
  }

  async #handleVisibility(isVisible) {
    if (isVisible) {
      this.#keyframeEffect.setKeyframes(modalOpeningAnimationKeyframes);
      this.container.append(this);
      await this.#playAnimation();
    } else {
      this.#keyframeEffect.setKeyframes(modalClosingAnimationKeyframes);
      await this.#playAnimation();
      this.remove();
    }
  }

  handleOutsideClick(event) {
    if (!this.contains(event.target) && !this.animationIsRunning) {
      this.visible = false;
      const customEvent = new CustomEvent("web-cart-modal-outside-click", { bubbles: true });
      this.dispatchEvent(customEvent);
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-cart-modal"]);
      this.replaceChildren(this.#surfaceElement);
      this.#hasBeenMountedOnce = true;
    }
    document.addEventListener("click", this.handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    if (oldvalue !== newValue) {
      switch (name) {
        case "data-visible": {
          this.#handleVisibility(typeof newValue === "string");
          break;
        }
      }
    }
  }
}

export default WebCartModal;