import classes from "./web-page.module.css";

class WebPage extends HTMLElement {
  #hasBeenMountedOnce = false;
  #level = 0;

  constructor() {
    super();
  }

  get level() {
    return this.#level;
  }

  set level(newLevel) {
    if (typeof newLevel === "number") {
      this.#level = newLevel;
    } else {
      throw new Error("The new level is not a number");
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-page"]);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebPage;