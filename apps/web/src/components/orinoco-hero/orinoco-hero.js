import componentTemplate from "./orinoco-hero.template";
import componentStyles from "./orinoco-hero.style";

class OrinocoHero extends HTMLElement {
  #hasBeenMountedOnce = false;
  #headingElement;
  #paragraphElement;

  static get observedAttributes() {
    return ["heading", "paragraph"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
    this.#headingElement = shadowRoot.querySelector("h1");
    this.#paragraphElement = shadowRoot.querySelector("p");
  }

  get heading() {
    return this.getAttribute("heading");
  }

  set heading(newHeading) {
    if (typeof newHeading === "string") {
      this.setAttribute("heading", newHeading);
    } else {
      this.removeAttribute("heading");
    }
  }

  get paragraph() {
    return this.getAttribute("paragraph");
  }

  set paragraph(newParagraph) {
    if (typeof newParagraph === "string") {
      this.setAttribute("paragraph", newParagraph);
    } else {
      this.removeAttribute("paragraph");
    }
  }

  handleHeading(newHeading) {
    this.#headingElement.textContent = newHeading ?? "";
  }

  handleParagraph(newParagraph) {
    this.#paragraphElement.textContent = newParagraph ?? "";
  }

  #upgradeProperty(propertyName) {
    if (typeof propertyName === "string") {
      if (this.hasOwnProperty(propertyName)) {
        let value = this[propertyName];
        delete this[propertyName];
        this[propertyName] = value;
      }
    } else {
      throw TypeError("The property name is not a string");
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.#upgradeProperty("heading");
      this.#upgradeProperty("paragraph");
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "heading": {
          this.handleHeading(newValue);
          break;
        }
        case "paragraph": {
          this.handleParagraph(newValue);
          break;
        }
      }
    }
  }
}

customElements.define("orinoco-hero", OrinocoHero);

export default OrinocoHero;
