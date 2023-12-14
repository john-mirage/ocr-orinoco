import componentTemplate from "./orinoco-button.template";
import componentStyles from "./orinoco-button.style";

class OrinocoButton extends HTMLElement {
  #buttonElement;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
    this.#buttonElement = shadowRoot.querySelector("button");
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const customEvent = new CustomEvent("web-button-click");
    this.dispatchEvent(customEvent);
  }

  connectedCallback() {
    this.#buttonElement.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.#buttonElement.removeEventListener("click", this.handleClick);
  }
}

customElements.define("orinoco-button", OrinocoButton);

export default OrinocoButton;
