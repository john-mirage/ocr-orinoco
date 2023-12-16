import NewProductAPI from "@api/new-product-api";
import WebPage from "@components/web-page";

class WebHomePage extends WebPage {
  #hasBeenMountedOnce = false;
  #webHero = document.createElement("web-hero");
  #webNavigationLinkButton = document.createElement("web-navigation-link-button");
  #webProductList = document.createElement("web-product-list");

  constructor() {
    super();
    this.level = 1;
    this.#webHero.title = "Trouvez l'appareil qui vous ressemble et qui saura sublimer votre talent";
    this.#webHero.description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur veniam sunt ratione perspiciatis fugiat nesciunt blanditiis, consequuntur quaerat!";
    this.#webNavigationLinkButton.label = "voir les caméras";
    this.#webNavigationLinkButton.href = "/orinoco/produits";
    this.#webHero.button = this.#webNavigationLinkButton;
    this.#webProductList.title = "Tendances";
  }

  handleProducts() {
    if (!this.#webProductList.products || NewProductAPI.outdated) {
      NewProductAPI.products
        .then((products) => {
          console.log("all the products will be updated", products);
          this.#webProductList.products = products;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#hasBeenMountedOnce) {
      this.replaceChildren(this.#webHero, this.#webProductList);
      this.#hasBeenMountedOnce = true;
    }
    this.handleProducts();
  }
}

export default WebHomePage;