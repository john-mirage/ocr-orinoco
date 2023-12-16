import WebButton from "@components/web-button";
import WebPage from "@components/web-page";

class WebNewNavigationButton extends WebButton {
  #hasBeenMountedOnce = false;
  #page;

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  constructor() {
    super();
    this.buttonElement.setAttribute("type", "button");
    this.handleClick = this.handleClick.bind(this);
  }

  get page() {
    return this.#page;
  }

  set page(newPage) {
    if (this.#page !== newPage) {
      this.#page = newPage instanceof WebPage ? newPage : undefined;
    }
  }

  handleClick() {
    if (this.page instanceof WebPage) {
      const customEvent = new CustomEvent("web-view-page", {
        bubbles: true,
        detail: { page: this.page }
      });
      this.dispatchEvent(customEvent);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#hasBeenMountedOnce) {
      this.currentElement = this.buttonElement;
      this.#hasBeenMountedOnce = true;
    }
    this.buttonElement.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.buttonElement.removeEventListener("click", this.handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
  }
}

export default WebNewNavigationButton;