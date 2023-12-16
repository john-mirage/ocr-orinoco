import classes from "./web-container.module.css";

class WebContainer extends HTMLElement {
  #hasBeenMountedOnce = false;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-container"]);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebContainer;