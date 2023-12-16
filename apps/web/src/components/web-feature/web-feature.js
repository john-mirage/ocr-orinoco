import classes from "./web-feature.module.css";

class WebFeature extends HTMLElement {
  #hasBeenMountedOnce = false;
  #titleElement = document.createElement("h3");
  #descriptionElement = document.createElement("p");

  static get observedAttributes() {
    return ["data-title", "data-description"];
  }

  constructor() {
    super();
    this.#titleElement.classList.add(classes["web-feature__title"]);
    this.#descriptionElement.classList.add(classes["web-feature__description"]);
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

  get description() {
    return this.dataset.description;
  }

  set description(newDescription) {
    if (typeof newDescription === "string") {
      this.dataset.description = newDescription;
    } else {
      this.removeAttribute("data-description");
    }
  }

  handleTitle(newTitle) {
    this.#titleElement.textContent = typeof newTitle === "string" ? newTitle : "";
  }

  handleDescription(newDescription) {
    this.#descriptionElement.textContent = typeof newDescription === "string" ? newDescription : "";
  }
  
  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-feature"]);
      this.replaceChildren(this.#titleElement, this.#descriptionElement);
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "data-title": {
          this.handleTitle(newValue);
          break;
        }
        case "data-description": {
          this.handleDescription(newValue);
          break;
        }
      }
    }
  }
}

export default WebFeature;