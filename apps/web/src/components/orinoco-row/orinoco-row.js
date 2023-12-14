import componentTemplate from "./orinoco-row.template";
import componentStyles from "./orinoco-row.style";

class OrinocoRow extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
  }
}

customElements.define("orinoco-row", OrinocoRow);

export default OrinocoRow;
