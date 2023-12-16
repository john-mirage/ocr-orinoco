import classes from "./web-footer.module.css";

const features = [
  {
    title: "Pas de frais de transport",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quae perspiciatis facilis dolores id cupiditate sit animi iusto! Repellendus temporibus facilis officiis."
  },
  {
    title: "Service client disponible 24/7",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quae perspiciatis facilis dolores id cupiditate sit animi iusto! Repellendus temporibus facilis officiis."
  },
  {
    title: "10 ans de garanties",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quae perspiciatis facilis dolores id cupiditate sit animi iusto! Repellendus temporibus facilis officiis."
  }
];

class WebFooter extends HTMLElement {
  #hasBeenMountedOnce = false;
  #webContainer = document.createElement("web-container");
  #footerElement = document.createElement("footer");
  #webFeatureList = document.createElement("web-feature-list");
  #rowElement = document.createElement("div");
  #rowLeftSectionElement = document.createElement("div");
  #rowRightSectionElement = document.createElement("div");
  #copyrightElement = document.createElement("p");

  constructor() {
    super();
    this.#webFeatureList.classList.add(classes["web-footer__feature-list"]);
    this.#rowElement.classList.add(classes["web-footer__row"]);
    this.#rowLeftSectionElement.classList.add(classes["web-footer__row-section"], classes["web-footer__row-section--left"]);
    this.#rowRightSectionElement.classList.add(classes["web-footer__row-section"], classes["web-footer__row-section--right"]);
    this.#copyrightElement.classList.add(classes["web-footer__copyright"]);
    this.#copyrightElement.textContent = "Copyright Orinoco";
    this.#webFeatureList.features = features;
    this.#webContainer.replaceChildren(this.#footerElement);
    this.#footerElement.replaceChildren(this.#webFeatureList, this.#rowElement);
    this.#rowElement.replaceChildren(this.#rowLeftSectionElement, this.#rowRightSectionElement);
    this.#rowLeftSectionElement.replaceChildren(this.#copyrightElement);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-footer"]);
      this.replaceChildren(this.#webContainer);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebFooter;