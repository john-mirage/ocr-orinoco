import componentTemplate from "./orinoco-footer.template";
import componentStyles from "./orinoco-footer.style";

const features = [
  {
    title: "Pas de frais de transport",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quae perspiciatis facilis dolores id cupiditate sit animi iusto! Repellendus temporibus facilis officiis.",
  },
  {
    title: "Service client disponible 24/7",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quae perspiciatis facilis dolores id cupiditate sit animi iusto! Repellendus temporibus facilis officiis.",
  },
  {
    title: "10 ans de garanties",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quae perspiciatis facilis dolores id cupiditate sit animi iusto! Repellendus temporibus facilis officiis.",
  },
];

class OrinocoFooter extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(componentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [componentStyles];
  }
}

customElements.define("orinoco-footer", OrinocoFooter);

export default OrinocoFooter;
