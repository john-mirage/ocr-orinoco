import { userAllowAnimation } from "@utils/user-preferences";
import classes from "./web-image.module.css";

const animationKeyframes = [
  { opacity: 0, offset: 0 },
  { opacity: 1, offset: 1 },
];

const animationOptions = {
  duration: 600,
  easing: "ease-in-out",
}

const IMAGE_ASPECT_RATIO_VAR = "--_image-aspect-ratio";

class WebImage extends HTMLElement {
  #hasBeenMountedOnce = false;
  #imageElement = document.createElement("img");
  #placeholderElement = document.createElement("span");
  #keyframeEffect = new KeyframeEffect(this.#imageElement, animationKeyframes, animationOptions);
  #animation = new Animation(this.#keyframeEffect, document.timeline);

  static get observedAttributes() {
    return ["data-aspect-ratio", "data-src", "data-alt"];
  }

  constructor() {
    super();
    this.#imageElement.classList.add(classes["web-image__image"]);
    this.#imageElement.setAttribute("draggable", "false");
    this.#placeholderElement.classList.add(classes["web-image__placeholder"]);
  }

  get hasAnimation() {
    return this.isConnected && userAllowAnimation();
  }

  get aspectRatio() {
    return this.dataset.aspectRatio ?? "16 / 9";
  }

  set aspectRatio(newAspectRatio) {
    if (typeof newAspectRatio === "string") {
      this.dataset.aspectRatio = newAspectRatio;
    } else {
      this.removeAttribute("data-aspect-ratio");
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

  handleAspectRatio(newAspectRatio) {
    if (typeof newAspectRatio === "string") {
      this.style.setProperty(IMAGE_ASPECT_RATIO_VAR, newAspectRatio);
    } else {
      this.style.removeProperty(IMAGE_ASPECT_RATIO_VAR);
    }
  }

  loadImage() {
    return new Promise((resolve, reject) => {
      this.#imageElement.onload = () => resolve(this.#imageElement);
      this.#imageElement.onerror = (error) => reject(error);
    });
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

  async handleSrc(oldSrc, newSrc) {
    if (typeof newSrc === "string") {
      if (typeof oldSrc === "string") {
        this.replaceChildren(this.#placeholderElement);
      }
      this.#imageElement.src = newSrc;
      await this.loadImage();
      this.append(this.#imageElement);
      await this.playAnimation();
      this.#placeholderElement.remove();
    } else {
      this.replaceChildren(this.#placeholderElement);
      this.#imageElement.removeAttribute("src");
    }
  }

  handleAlt(newAlt) {
    if (typeof newAlt === "string") {
      this.#imageElement.setAttribute("alt", newAlt);
    } else {
      this.#imageElement.removeAttribute("alt");
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-image"]);
      this.replaceChildren(this.#placeholderElement);
      this.#hasBeenMountedOnce = true;
    }
  }

  disconnectedCallback() {
    if (this.#animation.playState === "running") this.#animation.cancel();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "data-aspect-ratio": {
          this.handleAspectRatio(newValue);
          break;
        }
        case "data-src": {
          this.handleSrc(oldValue, newValue);
          break;
        }
        case "data-alt": {
          this.handleAlt(newValue);
          break;
        }
      }
    }
  }
}

export default WebImage;