import WebPage from "@components/web-page";

class WebCartPage extends WebPage {
  #hasBeenMountedOnce = false;
  #webBreadcrumbs = document.createElement("web-breadcrumbs");

  constructor() {
    super();
    this.level = 2;
    this.#webBreadcrumbs.path = "Panier";
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#hasBeenMountedOnce) {
      this.replaceChildren(this.#webBreadcrumbs);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebCartPage;