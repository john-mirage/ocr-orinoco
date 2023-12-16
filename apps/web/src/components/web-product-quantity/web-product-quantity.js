import classes from "./web-product-quantity.module.css";

class WebProductQuantity extends HTMLElement {
  #hasBeenMountedOnce = false;
  #labelElement = document.createElement("label");
  #rowElement = document.createElement("div");
  #inputElement = document.createElement("input");
  #minusButtonElement = document.createElement("button");
  #plusButtonElement = document.createElement("button");
  #minusWebIcon = document.createElement("web-icon");
  #plusWebIcon = document.createElement("web-icon");
  #value = 1;

  static get observedAttributes() {
    return ["data-id"];
  }

  constructor() {
    super();
    this.#labelElement.classList.add(classes["web-product-quantity__label"]);
    this.#rowElement.classList.add(classes["web-product-quantity__row"]);
    this.#inputElement.classList.add(classes["web-product-quantity__input"]);
    this.#minusButtonElement.classList.add(classes["web-product-quantity__button"]);
    this.#plusButtonElement.classList.add(classes["web-product-quantity__button"]);
    this.#minusButtonElement.setAttribute("type", "button");
    this.#minusButtonElement.setAttribute("disabled", "");
    this.#plusButtonElement.setAttribute("type", "button");
    this.#minusWebIcon.icon = "minus";
    this.#minusWebIcon.size = "1rem";
    this.#plusWebIcon.icon = "plus";
    this.#plusWebIcon.size = "1rem";
    this.#inputElement.setAttribute("disabled", "");
    this.#labelElement.textContent = "Quantité";
    this.#inputElement.value = String(this.value);
    this.#rowElement.replaceChildren(this.#minusButtonElement, this.#inputElement, this.#plusButtonElement);
    this.#minusButtonElement.replaceChildren(this.#minusWebIcon);
    this.#plusButtonElement.replaceChildren(this.#plusWebIcon);
    this.handleMinusButtonClick = this.handleMinusButtonClick.bind(this);
    this.handlePlusButtonClick = this.handlePlusButtonClick.bind(this);
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    if (this.value !== newValue) {
      if (typeof newValue === "number") {
        if (newValue >= 1 && newValue <= 10) {
          this.#value = newValue;
          this.#inputElement.value = String(newValue);
          this.handleButtons();
        }
      } else {
        this.#value = 1;
        this.#inputElement.value = "1";
        this.handleButtons();
      }
    }
  }

  handleButtons() {
    if (this.value > 1 && this.value < 10) {
      if (this.#minusButtonElement.hasAttribute("disabled")) this.#minusButtonElement.removeAttribute("disabled");
      if (this.#plusButtonElement.hasAttribute("disabled")) this.#plusButtonElement.removeAttribute("disabled");
    } else if (this.value <= 1) {
      if (!(this.#minusButtonElement.hasAttribute("disabled"))) this.#minusButtonElement.setAttribute("disabled", "");
      if (this.#plusButtonElement.hasAttribute("disabled")) this.#plusButtonElement.removeAttribute("disabled");
    } else if (this.value >= 10) {
      if (this.#minusButtonElement.hasAttribute("disabled")) this.#minusButtonElement.removeAttribute("disabled");
      if (!(this.#plusButtonElement.hasAttribute("disabled"))) this.#plusButtonElement.setAttribute("disabled", "");
    }
  }

  handleId(newId) {
    if (typeof newId === "string") {
      this.#labelElement.setAttribute("for", newId);
      this.#inputElement.setAttribute("id", newId);
    } else {
      this.#labelElement.removeAttribute("for");
      this.#inputElement.removeAttribute("id");
    }
  }

  handleMinusButtonClick() {
    this.value -= 1;
  }

  handlePlusButtonClick() {
    this.value += 1;
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-product-quantity"]);
      this.replaceChildren(this.#labelElement, this.#rowElement);
      this.#hasBeenMountedOnce = true;
    }
    this.#minusButtonElement.addEventListener("click", this.handleMinusButtonClick);
    this.#plusButtonElement.addEventListener("click", this.handlePlusButtonClick);
  }

  disconnectedCallback() {
    this.#minusButtonElement.removeEventListener("click", this.handleMinusButtonClick);
    this.#plusButtonElement.removeEventListener("click", this.handlePlusButtonClick);
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    if (oldvalue !== newValue) {
      switch (name) {
        case "data-id": {
          this.handleId(newValue);
          break;
        }
      }
    }
  }
}

export default WebProductQuantity;