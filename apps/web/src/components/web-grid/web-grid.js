import classes from "./web-grid.module.css";

class WebGrid extends HTMLUListElement {
  #hasBeenMountedOnce = false;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-grid"], classes["web-grid--cols-3"]);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebGrid;