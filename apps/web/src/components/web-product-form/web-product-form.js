import classes from "./web-product-form.module.css";

class WebProductForm extends HTMLElement {
  #hasBeenMountedOnce = false;
  #formElement = document.createElement("form");
  #webProductQuantity = document.createElement("web-product-quantity");

  constructor() {
    super();
    this.#webProductQuantity.id = "product-form-quantity";
    this.#formElement.replaceChildren(this.#webProductQuantity);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-product-form"]);
      this.replaceChildren(this.#formElement);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebProductForm;