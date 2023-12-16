import WebNavigationButton from "@components/web-navigation-button";
import WebNavigationLinkButton from "@components/web-navigation-link-button";
import WebPage from "@components/web-page";

class WebErrorPage extends WebPage {
  #hasBeenMountedOnce = false;
  #webHero = document.createElement("web-hero");
  #button;
  #navigationButton;
  #navigationLinkButton;

  static get observedAttributes() {
    return ["data-title", "data-description"];
  }

  constructor() {
    super();
    this.level = 5;
  }

  get navigationButton() {
    if (!this.#navigationButton) this.#navigationButton = document.createElement("web-navigation-button");
    return this.#navigationButton;
  }

  get navigationLinkButton() {
    if (!this.#navigationLinkButton) this.#navigationLinkButton = document.createElement("web-navigation-link-button");
    return this.#navigationLinkButton;
  }

  get title() {
    return this.dataset.title;
  }

  get description() {
    return this.dataset.description;
  }

  get button() {
    return this.#button;
  }

  set title(newTitle) {
    if (typeof newTitle === "string") {
      this.dataset.title = newTitle;
    } else {
      this.removeAttribute("data-title");
    }
  }

  set description(newDescription) {
    if (typeof newDescription === "string") {
      this.dataset.description = newDescription;
    } else {
      this.removeAttribute("data-description");
    }
  }

  set button(newButton) {
    if (this.#button !== newButton) {
      this.#button = newButton;
      this.handleButton(newButton);
    }
  }

  handleTitle(newTitle) {
    this.#webHero.title = newTitle;
  }

  handleDescription(newDescription) {
    this.#webHero.description = newDescription;
  }

  handleButton(newButton) {
    if (
      newButton instanceof WebNavigationButton ||
      newButton instanceof WebNavigationLinkButton
    ) {
      this.#webHero.button = newButton;
    } else {
      this.#webHero.button = undefined;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#hasBeenMountedOnce) {
      this.replaceChildren(this.#webHero);
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

export default WebErrorPage;