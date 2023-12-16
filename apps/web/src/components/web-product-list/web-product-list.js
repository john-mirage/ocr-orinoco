import ProductAPI from "@api/product-api";
import classes from "./web-product-list.module.css";

const CARD_NUMBER = 6;

class WebProductList extends HTMLElement {
  #hasBeenMountedOnce = false;
  #webContainer = document.createElement("web-container");
  #titleElement = document.createElement("h2");
  #webGrid = document.createElement("ul", { is: "web-grid" });
  #listItemElement = document.createElement("li");
  #webProductCard = document.createElement("web-product-card");
  #listItems;
  #products;

  static get observedAttributes() {
    return ["data-title"];
  }

  constructor() {
    super();
    this.#titleElement.classList.add(classes["web-product-list__title"]);
    this.#listItems = new Array(CARD_NUMBER).fill(undefined).map(this.#createListItem.bind(this));
    this.#webGrid.replaceChildren(...this.#listItems.map((listItem) => listItem.listItemElement));
    this.#webContainer.replaceChildren(this.#titleElement, this.#webGrid);
  }

  get title() {
    return this.dataset.title;
  }

  set title(newTitle) {
    if (typeof newTitle === "string") {
      this.dataset.title = newTitle;
    } else {
      this.removeAttribute("data-title");
    }
  }

  get products() {
    return this.#products;
  }

  set products(newProducts) {
    if (this.products !== newProducts) {
      if (ProductAPI.productsAreValid(newProducts)) {
        this.#products = newProducts;
        this.#handleProducts(newProducts);
      } else {
        this.#products = undefined;
        this.#listItems.forEach(({ listItemElement, webProductCard }) => {
          if (webProductCard.product !== undefined) webProductCard.product = undefined;
          if (!listItemElement.isConnected) this.#webGrid.append(listItemElement);
        });
      }
    }
  }

  #createListItem() {
    const listItemElement = this.#listItemElement.cloneNode(true);
    const webProductCard = this.#webProductCard.cloneNode(true);
    listItemElement.replaceChildren(webProductCard);
    return { listItemElement, webProductCard };
  }

  #handleProducts(newProducts) {
    const listItemsToPopulate = this.#listItems.slice(0, newProducts.length);
    const listItemsToClear = this.#listItems.slice(newProducts.length);
    listItemsToPopulate.forEach(({ listItemElement, webProductCard }, index) => {
      if (!listItemElement.isConnected) this.#webGrid.append(listItemElement);
      webProductCard.product = newProducts[index];
    });
    listItemsToClear.forEach(({ listItemElement, webProductCard }) => {
      if (listItemElement.isConnected) listItemElement.remove();
      webProductCard.product = undefined;
    });
  }

  #handleTitle(newTitle) {
    this.#titleElement.textContent = typeof newTitle === "string" ? newTitle : "";
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-product-list"]);
      this.replaceChildren(this.#webContainer);
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "data-title": {
          this.#handleTitle(newValue);
          break;
        }
      }
    }
  }
}

export default WebProductList;