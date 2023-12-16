import { userAllowAnimation } from "@utils/user-preferences";
import classes from "./web-badge.module.css";

const badgeOpeningAnimationKeyframes = [
  { transform: "scale3d(0.3, 0.3, 0.3)", opacity: 0, offset: 0 },
  { transform: "scale3d(1.1, 1.1, 1.1)", offset: 0.2 },
  { transform: "scale3d(0.9, 0.9, 0.9)", offset: 0.4 },
  { transform: "scale3d(1.03, 1.03, 1.03)", opacity: 1, offset: 0.6 },
  { transform: "scale3d(0.97, 0.97, 0.97)", offset: 0.8 },
  { transform: "scale3d(1, 1, 1)", opacity: 1, offset: 1 },
];

const badgeUpdateAnimationKeyframes = [
  { transform: "scale(1)", offset: 0 },
  { transform: "scale(1.5)", offset: 0.14 },
  { transform: "scale(1)", offset: 0.28 },
  { transform: "scale(1.5)", offset: 0.42 },
  { transform: "scale(1)", offset: 0.7 },
  { transform: "scale(1)", offset: 1 },
];

const badgeClosingAnimationKeyframes = [
  { transform: "scale3d(0.9, 0.9, 0.9)", offset: 0.2},
  { transform: "scale3d(1.1, 1.1, 1.1)", opacity: 1, offset: 0.5 },
  { transform: "scale3d(1.1, 1.1, 1.1)", opacity: 1, offset: 0.55 },
  { transform: "scale3d(0.3, 0.3, 0.3)", opacity: 0, offset: 1 },
];

const badgeOpeningAnimationOptions = {
  duration: 600,
  easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
};

const badgeUpdateAnimationOptions = {
  duration: 1200,
  easing: "ease-in-out",
}

const badgeClosingAnimationOptions = {
  duration: 600,
};

class WebBadge extends HTMLElement {
  #hasBeenMountedOnce = false;
  #labelElement = document.createElement("span");
  #openingKeyframeEffect = new KeyframeEffect(this, badgeOpeningAnimationKeyframes, badgeOpeningAnimationOptions);
  #updateKeyframeEffect = new KeyframeEffect(this, badgeUpdateAnimationKeyframes, badgeUpdateAnimationOptions);
  #closingKeyframeEffect = new KeyframeEffect(this, badgeClosingAnimationKeyframes, badgeClosingAnimationOptions);
  #animation = new Animation(null, document.timeline);
  #container;

  static get observedAttributes() {
    return ["data-label"];
  }

  constructor() {
    super();
    this.#labelElement.classList.add(classes["web-badge__label"]);
  }

  get hasAnimation() {
    return this.isConnected && userAllowAnimation();
  }

  get container() {
    if (this.#container instanceof HTMLElement) {
      return this.#container;
    } else {
      throw new TypeError("The container is not valid");
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

  get label() {
    return this.dataset.label;
  }

  set label(newLabel) {
    if (typeof newLabel === "string") {
      this.dataset.label = newLabel;
    } else {
      this.removeAttribute("data-label");
    }
  }

  async playAnimation() {
    if (this.hasAnimation) {
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

  async handleLabel(oldLabel, newLabel) {
    if (typeof newLabel === "string") {
      this.#labelElement.textContent = newLabel;
      if (typeof oldLabel === "string") {
        this.#animation.effect = this.#updateKeyframeEffect;
        await this.playAnimation();
      } else {
        this.container.append(this);
        this.#animation.effect = this.#openingKeyframeEffect;
        await this.playAnimation();
      }
    } else {
      this.#animation.effect = this.#closingKeyframeEffect;
      await this.playAnimation();
      this.remove();
      this.#labelElement.textContent = "";
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-badge"]);
      this.replaceChildren(this.#labelElement);
      this.#hasBeenMountedOnce = true;
    }
  }

  disconnectedCallback() {
    if (this.#animation.playState === "running") this.#animation.cancel();
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    if (this.#animation.playState === "running") this.#animation.cancel();
    if (oldvalue !== newValue) {
      switch (name) {
        case "data-label": {
          this.handleLabel(oldvalue, newValue);
          break;
        }
      }
    }
  }
}

export default WebBadge;