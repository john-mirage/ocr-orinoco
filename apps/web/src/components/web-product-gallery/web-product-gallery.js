import WebProductLightbox from "@components/web-product-lightbox";
import classes from "./web-product-gallery.module.css";

class WebProductGallery extends HTMLElement {
  #hasBeenMountedOnce = false;
  #buttonElement = document.createElement("button");
  #webImage = document.createElement("web-image");
  #webProductLightbox;

  static get observedAttributes() {
    return ["data-src", "data-alt"];
  }

  constructor() {
    super();
    this.#webImage.aspectRatio = "4 / 3";
    this.#buttonElement.classList.add(classes["web-product-gallery__button"]);
    this.#buttonElement.replaceChildren(this.#webImage);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  get #hasLightbox() {
    return this.#webProductLightbox instanceof WebProductLightbox;
  }

  get #lightbox() {
    if (!this.#hasLightbox) this.#webProductLightbox = document.createElement("web-product-lightbox");
    return this.#webProductLightbox;
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

  #handleSrc(newSrc) {
    this.#webImage.src = typeof newSrc === "string" ? newSrc : undefined;
  }

  #handleAlt(newAlt) {
    this.#webImage.alt = typeof newAlt === "string" ? newAlt : undefined;
  }

  handleButtonClick() {
    const isVisible = !this.#lightbox.visible;
    if (isVisible) {
      this.#lightbox.src = this.src;
      this.#lightbox.alt = this.alt;
    }
    this.#lightbox.visible = isVisible;
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-product-gallery"]);
      this.replaceChildren(this.#buttonElement);
      this.#hasBeenMountedOnce = true;
    }
    this.#buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    if (this.#hasLightbox) {
      this.#lightbox.visible = false;
    }
    this.#buttonElement.removeEventListener("click", this.handleButtonClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
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

export default WebProductGallery;