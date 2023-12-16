import classes from "./web-logo.module.css";

class WebLogo extends HTMLElement {
  #hasBeenMountedOnce = false;
  #linkElement;

  constructor() {
    super();
    const template = document.getElementById("template-web-logo");
    this.#linkElement = template.content.firstElementChild.cloneNode(true);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const href = event.currentTarget.href;
    const customEvent = new CustomEvent("web-router-href", {
      bubbles: true,
      detail: { href }
    });
    this.dispatchEvent(customEvent);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-logo"]);
      this.replaceChildren(this.#linkElement);
      this.#hasBeenMountedOnce = true;
    }
    this.#linkElement.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.#linkElement.removeEventListener("click", this.handleClick);
  }
}

export default WebLogo;