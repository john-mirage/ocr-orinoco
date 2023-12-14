import componentTemplate from "./orinoco-home-view.template";
import componentStyles from "./orinoco-home-view.style";

class OrinocoHomeView extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
  }
}

customElements.define("orinoco-home-view", OrinocoHomeView);

export default OrinocoHomeView;
