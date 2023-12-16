class WebCard extends HTMLElement {
  #hasBeenMountedOnce = false;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("web-card");
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebCard;