import classes from "./web-rating-star.module.css";

class WebRatingStar extends HTMLElement {
  #hasBeenMountedOnce = false;
  #webIcon = document.createElement("web-icon");

  static get observedAttributes() {
    return ["data-active"];
  }

  constructor() {
    super();
    this.#webIcon.size = "1.25rem";
    this.#webIcon.icon = "star-outlined";
    this.#webIcon.color = "primary";
  }

  get active() {
    return this.hasAttribute("data-active");
  }

  set active(isActive) {
    if (isActive) {
      this.setAttribute("data-active", "");
    } else {
      this.removeAttribute("data-active");
    }
  }

  handleActiveState(isActive) {
    if (isActive) {
      this.#webIcon.icon = "star-filled";
    } else {
      this.#webIcon.icon = "star-outlined";
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-rating-star"]);
      this.replaceChildren(this.#webIcon);
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    if (oldvalue !== newValue) {
      switch (name) {
        case "data-active": {
          this.handleActiveState(typeof newValue === "string");
          break;
        }
      }
    }
  }
}

export default WebRatingStar;