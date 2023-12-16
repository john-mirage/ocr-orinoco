import NewProductAPI from "@api/new-product-api";
import WebPage from "@components/web-page";

class WebProductPage extends WebPage {
  #hasBeenMountedOnce = false;
  #webProduct = document.createElement("web-product");

  constructor() {
    super();
    this.level = 2;
  }

  handleProduct() {
    const query = window.location.search;
    if (query.length > 0) {
      const params = new URLSearchParams(query);
      if (params.has("uuid")) {
        const uuid = params.get("uuid");
        NewProductAPI.getOneProduct(uuid)
          .then((product) => {
            this.#webProduct.product = product;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("web-page--top-padding");
      this.replaceChildren(this.#webProduct);
      this.#hasBeenMountedOnce = true;
    }
    this.handleProduct();
  }
}

export default WebProductPage;