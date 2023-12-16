const PRODUCTS_HREF = "http://localhost:3000/products/";
const UUID_REGEX = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;

class ProductAPI {
  static #requests = new Map();
  static #abortController;

  static get abortController() {
    return this.#abortController;
  }

  static productIsValid(product) {
    return (
      Object.keys(product ?? {}).length === 6 &&
      typeof product.uuid === "string" &&
      typeof product.name === "string" &&
      typeof product.price === "number" &&
      typeof product.description === "string" &&
      typeof product.image === "string" &&
      Array.isArray(product.lenses) &&
      product.lenses.every((lens) => typeof lens === "string")
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

  static getAllProducts() {
    if (this.#requests.has(PRODUCTS_HREF)) {
      return Promise.resolve(this.#requests.get(PRODUCTS_HREF));
    }
    this.#abortController = new AbortController();
    return fetch(PRODUCTS_HREF, { signal: this.#abortController.signal })
      .then(async (response) => {
        this.#abortController = undefined;
        if (response.ok) {
          const products = await response.json();
          this.#requests.set(PRODUCTS_HREF, products);
          return products;
        } else {
          const errorMessage = await response.text();
          return Promise.reject(new Error(errorMessage));
        }
      });
  }
  
  static getOneProduct(productUUID) {
    if (this.productUUIDIsValid(productUUID)) {
      const productHref = `${PRODUCTS_HREF}${productUUID}`;
      if (this.#requests.has(productHref)) {
        return Promise.resolve(this.#requests.get(productHref));
      }
      if (this.#requests.has(PRODUCTS_HREF)) {
        const products = this.#requests.get(PRODUCTS_HREF);
        const product = products.find((product) => product.uuid === productUUID);
        if (product) {
          this.#requests.set(productHref, product);
          return Promise.resolve(product);
        }
      }
      this.#abortController = new AbortController();
      return fetch(productHref, { signal: this.#abortController.signal })
        .then(async (response) => {
          this.#abortController = undefined;
          if (response.ok) {
            const product = await response.json();
            this.#requests.set(productHref, product);
            return product;
          } else {
            const errorMessage = await response.text();
            return Promise.reject(new Error(errorMessage));
          }
        });
    } else {
      throw new Error("The product UUID is not valid");
    }
  }

  static abort() {
    if (this.#abortController instanceof AbortController) {
      this.#abortController.abort();
    }
  }
}

export default ProductAPI;

/*
static async getAllProducts(signal) {
  if (signal instanceof AbortSignal) {
    let products = [];
    let error = false;
    const response = await fetch(API_URL, { signal })
      .then(response => response)
      .catch((error) => error.message);
    if (response instanceof Response) {
      if (response.ok) {
        products = await response.json();
      } else {
        error = "not-found";
      }
    } else if (typeof response === "string") {
      error = response === "The user aborted a request." ? "aborted" : "error";
    } else {
      throw new Error("unknown response");
    }
    return { products, error };
  } else {
    throw new Error("Invalid parameters");
  }
}

static async getOneProduct(productUUID, signal) {
  if (
    typeof productUUID === "string" &&
    productUUID.length > 0 &&
    signal instanceof AbortSignal
  ) {
    let product = false;
    let error = false;
    const response = await fetch(API_URL + productUUID, { signal })
      .then(response => response)
      .catch((error) => error.message);
    if (response instanceof Response) {
      if (response.ok) {
        product = await response.json();
      } else {
        error = "not-found";
      }
    } else if (typeof response === "string") {
      error = response === "The user aborted a request." ? "aborted" : "error";
    } else {
      throw new Error("unknown response");
    }
    return { product, error };
  }
  throw new Error("Invalid parameters");
}
*/