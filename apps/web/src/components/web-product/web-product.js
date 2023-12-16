import NewProductAPI from "@api/new-product-api";
import { formatProductPrice } from "@utils/formatter";
import classes from "./web-product.module.css";

class WebProduct extends HTMLElement {
  #hasBeenMountedOnce = false;
  #webContainer = document.createElement("web-container");
  #webProductGallery = document.createElement("web-product-gallery");
  #rightSectionElement = document.createElement("div");
  #nameElement = document.createElement("h1");
  #priceElement = document.createElement("p");
  #webRating = document.createElement("web-rating");
  #descriptionElement = document.createElement("p");
  #webProductForm = document.createElement("web-product-form");
  #product;

  constructor() {
    super();
    this.#webContainer.classList.add(classes["web-product__container"]);
    this.#webRating.classList.add(classes["web-product__rating"]);
    this.#nameElement.classList.add(classes["web-product__text"], classes["web-product__text--name"]);
    this.#priceElement.classList.add(classes["web-product__text"], classes["web-product__text--price"]);
    this.#descriptionElement.classList.add(classes["web-product__text"], classes["web-product__text--description"]);
    this.#webRating.score = "4";
    this.#webContainer.replaceChildren(this.#webProductGallery, this.#rightSectionElement);
    this.#rightSectionElement.replaceChildren(this.#nameElement, this.#priceElement, this.#webRating, this.#descriptionElement, this.#webProductForm);
  }

  get product() {
    return this.#product;
  }

  set product(newProduct) {
    if (NewProductAPI.productIsValid(newProduct)) {
      this.classList.remove(classes["web-product--empty"]);
      this.#handleName(this.#product?.name, newProduct.name);
      this.#handlePrice(this.#product?.price, newProduct.price);
      this.#handleDescription(this.#product?.description, newProduct.description);
      this.#handleImage(this.#product?.image, newProduct.image);
      this.#product = newProduct;
    } else {
      this.classList.add(classes["web-product--empty"]);
      this.#handleName(this.#product?.name);
      this.#handlePrice(this.#product?.price);
      this.#handleDescription(this.#product?.description);
      this.#handleImage(this.#product?.image);
      this.#product = undefined;
    }
  }

  #handleName(oldName, newName) {
    if (oldName !== newName) {
      if (typeof newName === "string") {
        this.#webProductGallery.alt = `Appareil photo ${newName}`;
        this.#nameElement.textContent = newName;
      } else {
        this.#webProductGallery.alt = undefined;
        this.#nameElement.textContent = "";
      }
    }
  }

  #handlePrice(oldPrice, newPrice) {
    if (oldPrice !== newPrice) {
      this.#priceElement.textContent = typeof newPrice === "number" ? formatProductPrice(newPrice) : undefined;
    }
  }

  #handleDescription(oldDescription, newDescription) {
    if (oldDescription !== newDescription) {
      this.#descriptionElement.textContent = typeof newDescription === "string" ? newDescription : undefined;
    }
  }

  #handleImage(oldImage, newImage) {
    if (oldImage !== newImage) {
      this.#webProductGallery.src = newImage;
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-product"], classes["web-product--empty"]);
      this.replaceChildren(this.#webContainer);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebProduct;