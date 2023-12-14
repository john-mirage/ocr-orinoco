import componentTemplate from "./orinoco-header.template";
import componentStyles from "./orinoco-header.style";

class OrinocoHeader extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event) {
    console.log(event);
  }

  connectedCallback() {
    this.addEventListener("scroll", this.handleScroll);
  }

  disconnectedCallback() {
    this.removeEventListener("scroll", this.handleScroll);
  }
}

customElements.define("orinoco-header", OrinocoHeader);

export default OrinocoHeader;
