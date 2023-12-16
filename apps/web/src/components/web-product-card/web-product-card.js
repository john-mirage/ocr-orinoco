import ProductAPI from "@api/product-api";
import { formatProductPrice } from "@utils/formatter";
import classes from "./web-product-card.module.css";

const pluralFormatter = new Intl.PluralRules("fr-FR");

class WebProductCard extends HTMLElement {
  #hasBeenMountedOnce = false;
  #linkElement = document.createElement("a");
  #webImage = document.createElement("web-image");
  #bodyElement = document.createElement("div");
  #rowElement = document.createElement("div");
  #nameElement = document.createElement("h3");
  #priceElement = document.createElement("p");
  #lensElement = document.createElement("p");
  #product;

  constructor() {
    super();
    this.#linkElement.classList.add(classes["web-product-card__link"]);
    this.#bodyElement.classList.add(classes["web-product-card__body"]);
    this.#rowElement.classList.add(classes["web-product-card__row"]);
    this.#nameElement.classList.add(classes["web-product-card__text"], classes["web-product-card__text--name"]);
    this.#priceElement.classList.add(classes["web-product-card__text"], classes["web-product-card__text--price"]);
    this.#lensElement.classList.add(classes["web-product-card__text"], classes["web-product-card__text--lenses"]);
    this.#rowElement.replaceChildren(this.#nameElement, this.#priceElement);
    this.#bodyElement.replaceChildren(this.#rowElement, this.#lensElement);
    this.#linkElement.replaceChildren(this.#webImage, this.#bodyElement);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  get product() {
    return this.#product;
  }

  set product(newProduct) {
    if (ProductAPI.productIsValid(newProduct)) {
      this.classList.remove(classes["web-product-card--empty"]);
      this.#handleUuid(this.#product?.uuid, newProduct.uuid);
      this.#handleImageSrc(this.#product?.image, newProduct.image);
      this.#handleName(this.#product?.name, newProduct.name);
      this.#handlePrice(this.#product?.price, newProduct.price);
      this.#handleLensNumber(this.#product?.lenses.length, newProduct.lenses.length);
      this.#product = newProduct;
    } else {
      this.classList.add(classes["web-product-card--empty"]);
      this.#handleUuid(this.#product?.uuid);
      this.#handleImageSrc(this.#product?.image);
      this.#handleName(this.#product?.name);
      this.#handlePrice(this.#product?.price);
      this.#handleLensNumber(this.#product?.lenses.length);
      this.#product = undefined;
    }
  }

  #handleUuid(oldUuid, newUuid) {
    if (oldUuid !== newUuid) {
      if (typeof newUuid === "string") {
        const href = `/orinoco/produit?uuid=${newUuid}`;
        this.#linkElement.setAttribute("href", href);
      } else {
        this.#linkElement.removeAttribute("href");
      }
    }
  }

  #handleImageSrc(oldSrc, newSrc) {
    if (oldSrc !== newSrc) {
      this.#webImage.src = typeof newSrc === "string" ? newSrc : undefined;
    }
  }

  #handleName(oldName, newName) {
    if (oldName !== newName) {
      if (typeof newName === "string") {
        this.#nameElement.textContent = newName;
        this.#webImage.alt = `Appareil photo ${newName}`;
      } else {
        this.#nameElement.textContent = "";
        this.#webImage.alt = undefined;
      }
    }
  }

  #handlePrice(oldPrice, newPrice) {
    if (oldPrice !== newPrice) {
      if (typeof newPrice === "number") {
        this.#priceElement.textContent = formatProductPrice(newPrice);
      } else {
        this.#priceElement.textContent = "";
      }
    }
  }

  #handleLensNumber(oldLensNumber, newLensNumber) {
    if (oldLensNumber !== newLensNumber) {
      if (typeof newLensNumber === "number") {
        const pluralRule = pluralFormatter.select(newLensNumber);
        this.#lensElement.textContent = pluralRule === "one"
          ? `${newLensNumber > 0 ? String(newLensNumber) : "Aucun "} objectif disponible`
          : `${String(newLensNumber)} objectifs disponibles`;
      } else {
        this.#lensElement.textContent = "";
      }
    }
  }

  handleLinkClick(event) {
    event.preventDefault();
    if (typeof this.product) {
      const href = event.currentTarget.href;
      const customEvent = new CustomEvent("web-router-href", {
        bubbles: true,
        detail: { href }
      });
      this.dispatchEvent(customEvent);
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-product-card"], classes["web-product-card--empty"]);
      this.replaceChildren(this.#linkElement);
      this.#hasBeenMountedOnce = true;
    }
    this.#linkElement.addEventListener("click", this.handleLinkClick);
  }

  disconnectedCallback() {
    this.#linkElement.removeEventListener("click", this.handleLinkClick);
  }
}

export default WebProductCard;