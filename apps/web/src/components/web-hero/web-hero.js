import WebNavigationButton from "@components/web-navigation-button";
import WebNavigationLinkButton from "@components/web-navigation-link-button";
import classes from "./web-hero.module.css";

class WebHero extends HTMLElement {
  #hasBeenMountedOnce = false;
  #webContainer = document.createElement("web-container");
  #sectionElement = document.createElement("section");
  #titleElement = document.createElement("h1");
  #descriptionElement = document.createElement("p");
  #button;

  static get observedAttributes() {
    return ["data-title", "data-description"];
  }

  constructor() {
    super();
    this.#sectionElement.classList.add(classes["web-hero__container"]);
    this.#titleElement.classList.add(classes["web-hero__title"]);
    this.#descriptionElement.classList.add(classes["web-hero__description"]);
    this.#webContainer.replaceChildren(this.#sectionElement);
    this.#sectionElement.replaceChildren(this.#titleElement, this.#descriptionElement);
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

  get button() {
    return this.#button;
  }

  set button(newButton) {
    if (this.#button !== newButton) {
      if (newButton instanceof WebNavigationButton || newButton instanceof WebNavigationLinkButton) {
        if (this.#button instanceof WebNavigationButton || this.#button instanceof WebNavigationLinkButton) {
          this.#button.replaceWith(newButton);
        } else {
          this.#sectionElement.append(newButton);
        }
        this.#button = newButton;
      } else {
        this.#button.remove();
        this.#button = undefined;
      }
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
      this.classList.add(classes["web-hero"]);
      this.replaceChildren(this.#webContainer);
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

export default WebHero;