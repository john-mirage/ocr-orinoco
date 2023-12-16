import classes from "./web-cart-overview.module.css";

class WebCartOverview extends HTMLElement {
  #hasBeenMountedOnce = false;
  #webIconButton = document.createElement("web-icon-button");
  #webCartOverviewModal;

  constructor() {
    super();
    this.#webIconButton.classList.add(classes["web-cart-overview__button"]);
    this.handlebuttonClick = this.handlebuttonClick.bind(this);
    this.handleModalClosingFromOutside = this.handleModalClosingFromOutside.bind(this);
  }

  get #modal() {
    if (!this.#webCartOverviewModal) {
      this.#webCartOverviewModal = document.createElement("web-cart-modal");
      this.#webCartOverviewModal.classList.add(classes["web-cart-overview__modal"]);
      this.#webCartOverviewModal.container = this;
    }
    return this.#webCartOverviewModal;
  }

  handlebuttonClick(event) {
    event.stopImmediatePropagation();
    if (!this.#modal.animationIsRunning) {
      if (this.#modal.visible) {
        this.#webIconButton.icon = "cart";
        this.#modal.visible = false;
      } else {
        this.#webIconButton.icon = "close";
        this.#modal.visible = true;
      }
    }
  }

  handleModalClosingFromOutside() {
    this.#webIconButton.icon = "cart";
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-cart-overview"]);
      this.replaceChildren(this.#webIconButton);
      this.#webIconButton.icon = "cart";
      this.#webIconButton.badge = "3";
      this.#hasBeenMountedOnce = true;
    }
    this.#webIconButton.buttonElement.addEventListener("click", this.handlebuttonClick);
    this.addEventListener("web-cart-modal-outside-click", this.handleModalClosingFromOutside);
  }

  disconnectedCallback() {
    this.#webIconButton.buttonElement.removeEventListener("click", this.handlebuttonClick);
    this.removeEventListener("web-cart-modal-outside-click", this.handleModalClosingFromOutside);
  }
}

export default WebCartOverview;