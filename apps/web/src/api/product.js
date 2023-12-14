const PRODUCTS_HREF = "http://localhost:3000/products/";

const UUID_REGEX = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;

class NewProductAPI {
  static #products;
  static #timestamp = 0;

  static get outdated() {
    return (Date.now() - this.#timestamp) >= 300000;
  }

  static productIsValid(product) {
    const { uuid, name, price, description, image, lenses } = product;
    return (
      Object.keys(product).length === 6 &&
      typeof uuid === "string" &&
      typeof name === "string" &&
      typeof price === "number" &&
      typeof description === "string" &&
      typeof image === "string" &&
      Array.isArray(lenses) &&
      lenses.every((lens) => typeof lens === "string")
    );
  }

  static productsAreValid(products) {
    return (
      Array.isArray(products) &&
      products.every(this.productIsValid)
    );
  }

  static productUUIDIsValid(productUUID) {
    if (typeof productUUID === "string") {
      return UUID_REGEX.test(productUUID);
    } else {
      return false;
    }
  }

  static get products() {
    if (!this.#products || this.outdated) {
      return fetch(PRODUCTS_HREF)
        .then(async (response) => {
          if (response.ok) {
            this.#products = await response.json();
            this.#timestamp = Date.now();
            return Promise.resolve(this.#products);
          } else {
            const errorMessage = await response.text();
            return Promise.reject(new Error(errorMessage));
          }
        });
    } else {
      return Promise.resolve(this.#products);
    }
  }

  static async getOneProduct(uuid) {
    try {
      const products = await this.products;
      const product = products.find((product) => product.uuid === uuid);
      if (product) {
        return product;
      } else {
        throw new Error("The product do not exist");
      }
    } catch (error) {
      throw error;
    }
  }
}

export default NewProductAPI;