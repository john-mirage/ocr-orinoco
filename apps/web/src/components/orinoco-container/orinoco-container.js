import componentTemplate from "./orinoco-container.template";
import componentStyles from "./orinoco-container.style";

class OrinocoContainer extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
  }
}

customElements.define("orinoco-container", OrinocoContainer);

export default OrinocoContainer;
