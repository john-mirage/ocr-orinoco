import { userAllowAnimation } from "@utils/user-preferences";
import classes from "./web-icon-button.module.css";

const iconFadeOutAnimationKeyframes = [
  { opacity: 1, transform: "translateY(0)", offset: 0 },
  { opacity: 0, transform: "translateY(-1rem)", offset: 1 },
];

const iconFadeInAnimationKeyframes = [
  { opacity: 0, transform: "translateY(1rem)", offset: 0 },
  { opacity: 1, transform: "translateY(0)", offset: 1 },
];

const iconAnimationOptions = {
  duration: 100,
  easing: "ease-in-out",
}

class WebIconButton extends HTMLElement {
  #hasBeenMountedOnce = false;
  #buttonElement = document.createElement("button");
  #webIcon = document.createElement("web-icon");
  #keyframeEffect = new KeyframeEffect(this.#webIcon, null, iconAnimationOptions);
  #animation = new Animation(this.#keyframeEffect, document.timeline);
  #webBadge;

  static get observedAttributes() {
    return ["data-icon", "data-badge"];
  }

  constructor() {
    super();
    this.#buttonElement.classList.add(classes["web-icon-button__button"]);
    this.#buttonElement.setAttribute("type", "button");
    this.#webIcon.size = "1.25rem";
    this.#buttonElement.replaceChildren(this.#webIcon);
  }

  get hasAnimation() {
    return this.isConnected && userAllowAnimation();
  }

  get webBadge() {
    if (!this.#webBadge) {
      this.#webBadge = document.createElement("web-badge");
      this.#webBadge.classList.add(classes["web-icon-button__badge"]);
      this.#webBadge.container = this;
    }
    return this.#webBadge;
  }

  get buttonElement() {
    return this.#buttonElement;
  }

  get icon() {
    return this.dataset.icon;
  }

  set icon(newIcon) {
    if (typeof newIcon === "string") {
      this.dataset.icon = newIcon;
    } else {
      this.removeAttribute("data-icon");
    }
  }

  get badge() {
    return this.dataset.badge;
  }

  set badge(newBadge) {
    if (typeof newBadge === "string") {
      this.dataset.badge = newBadge;
    } else {
      this.removeAttribute("data-badge");
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

  async handleIcon(oldIcon, newIcon) {
    if (typeof newIcon === "string") {
      if (typeof oldIcon === "string") {
        this.#buttonElement.setAttribute("disabled", "");
        this.#keyframeEffect.setKeyframes(iconFadeOutAnimationKeyframes);
        await this.playAnimation();
        this.#webIcon.icon = newIcon;
        this.#keyframeEffect.setKeyframes(iconFadeInAnimationKeyframes);
        await this.playAnimation();
        this.#buttonElement.removeAttribute("disabled");
      } else {
        this.#webIcon.icon = newIcon;
      }
    } else {
      this.#webIcon.icon = undefined;
    }
  }

  handleBadge(newBadge) {
    if (typeof newBadge === "string") {
      this.webBadge.label = newBadge;
    } else {
      this.webBadge.label = undefined;
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-icon-button"]);
      this.replaceChildren(this.#buttonElement);
      this.#hasBeenMountedOnce = true;
    }
  }

  disconnectedCallback() {
    if (this.#animation.playState === "running") {
      this.#animation.cancel();
    }
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    if (oldvalue !== newValue) {
      switch (name) {
        case "data-icon": {
          this.handleIcon(oldvalue, newValue);
          break;
        }
        case "data-badge": {
          this.handleBadge(newValue);
          break;
        }
      }
    }
  }
}

export default WebIconButton;