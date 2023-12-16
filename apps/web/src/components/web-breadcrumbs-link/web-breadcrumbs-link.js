class WebBreadcrumbsLink extends HTMLElement {
  #hasBeenMountedOnce = false;
  #anchorElement = document.createElement("a");

  constructor() {
    super();
    this.#anchorElement.classList.add("web-breadcrumbs-link__link");
  }

  static get observedAttributes() {
    return ["data-icon"];
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("web-breadcrumbs-link");
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebBreadcrumbsLink;