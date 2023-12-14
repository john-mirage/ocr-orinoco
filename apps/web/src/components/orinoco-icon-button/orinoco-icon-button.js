import componentTemplate from "./orinoco-icon-button.template";
import componentStyles from "./orinoco-icon-button.style";
import { userAllowAnimation } from "@utils/user-preferences";

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
};

class OrinocoIconButton extends HTMLElement {
  #hasBeenCalledOnce = false;
  #keyframeEffect;
  #animation;
  #buttonElement;
  #webIcon;
  #webBadge;

  static get observedAttributes() {
    return ["icon", "badge"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
    this.#buttonElement = this.shadowRoot.querySelector("button");
    this.#webIcon = this.shadowRoot.querySelector("orinoco-icon");
    this.#webIcon.size = "1.25rem";
    this.#keyframeEffect = new KeyframeEffect(
      this.#webIcon,
      null,
      iconAnimationOptions
    );
    this.#animation = new Animation(this.#keyframeEffect, document.timeline);
  }

  get hasAnimation() {
    return this.isConnected && userAllowAnimation();
  }

  get webBadge() {
    if (!this.#webBadge) {
      this.#webBadge = this.shadowRoot.createElement("web-badge");
      this.#webBadge.classList.add("badge");
      this.#webBadge.container = this;
    }
    return this.#webBadge;
  }

  get buttonElement() {
    return this.#buttonElement;
  }

  get icon() {
    return this.getAttribute("icon");
  }

  set icon(newIcon) {
    if (typeof newIcon === "string") {
      this.setAttribute("icon", newIcon);
    } else {
      this.removeAttribute("icon");
    }
  }

  get badge() {
    return this.getAttribute("badge");
  }

  set badge(newBadge) {
    if (typeof newBadge === "string") {
      this.setAttribute("badge", newBadge);
    } else {
      this.removeAttribute("badge");
    }
  }

  async #playAnimation() {
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

  async #handleIcon(oldIcon, newIcon) {
    if (typeof newIcon === "string") {
      if (typeof oldIcon === "string") {
        this.#buttonElement.setAttribute("disabled", "");
        this.#keyframeEffect.setKeyframes(iconFadeOutAnimationKeyframes);
        await this.#playAnimation();
        this.#webIcon.icon = newIcon;
        this.#keyframeEffect.setKeyframes(iconFadeInAnimationKeyframes);
        await this.#playAnimation();
        this.#buttonElement.removeAttribute("disabled");
      } else {
        this.#webIcon.icon = newIcon;
      }
    } else {
      this.#webIcon.icon = undefined;
    }
  }

  #handleBadge(newBadge) {
    if (typeof newBadge === "string") {
      this.webBadge.label = newBadge;
    } else {
      this.webBadge.label = undefined;
    }
  }

  upgradeProperty(propertyName) {
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
    if (!this.#hasBeenCalledOnce) {
      this.upgradeProperty("icon");
      this.upgradeProperty("badge");
      this.#hasBeenCalledOnce = true;
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
        case "icon": {
          this.#handleIcon(oldvalue, newValue);
          break;
        }
        case "badge": {
          this.#handleBadge(newValue);
          break;
        }
      }
    }
  }
}

customElements.define("orinoco-icon-button", OrinocoIconButton);

export default OrinocoIconButton;
