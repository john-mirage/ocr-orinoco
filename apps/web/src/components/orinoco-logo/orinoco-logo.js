import componentTemplate from "./orinoco-logo.template";
import componentStyles from "./orinoco-logo.style";

class OrinocoLogo extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
    /*
    this.handleClick = this.handleClick.bind(this);
    */
  }

  /*
  handleClick(event) {
    event.preventDefault();
    const href = event.currentTarget.href;
    const customEvent = new CustomEvent("web-router-href", {
      bubbles: true,
      detail: { href }
    });
    this.dispatchEvent(customEvent);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-logo"]);
      this.replaceChildren(this.#linkElement);
      this.#hasBeenMountedOnce = true;
    }
    this.#linkElement.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.#linkElement.removeEventListener("click", this.handleClick);
  }
  */
}

customElements.define("orinoco-logo", OrinocoLogo);

export default OrinocoLogo;
