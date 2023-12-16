import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "@utils/local-storage";

const LOCAL_STORAGE_KEY = "orinoco-cart";

class CartAPI {
  static #cart = [];

  static cartItemLensIsValid(cartItemLens) {
    return (
      Object.keys(cartItemLens).length === 2 &&
      cartItemLens.hasOwnProperty("name") &&
      cartItemLens.hasOwnProperty("quantity") &&
      typeof cartItemLens.name === "string" &&
      typeof cartItemLens.quantity === "number"
    );
  }

  static cartItemIsValid(cartItem) {
    return (
      Object.keys(cartItem).length === 2 &&
      cartItem.hasOwnProperty("cameraUUID") &&
      cartItem.hasOwnProperty("lenses") &&
      typeof cartItem.uuid === "string" &&
      Array.isArray(cartItem.lenses) &&
      cartItem.lenses.every(this.cartItemLensIsValid)
    );
  }

  static cartIsValid(cart) {
    return (
      Array.isArray(cart) &&
      cart.every(this.cartItemIsValid)
    );
  }

  static get cart() {
    if (!this.#cart) {
      const localStorageCart = getLocalStorageItem(LOCAL_STORAGE_KEY);
      if (localStorageCart !== null) {
        if (Array.isArray(localStorageCart) && localStorageCart.length > 0) {
          const validCartItems = localStorageCart.filter(this.cartItemIsValid);
          if (localStorageCart.length !== validCartItems.length) {
            setLocalStorageItem(LOCAL_STORAGE_KEY, validCartItems);
          }
          this.#cart = localStorageCart.filter(validCartItems);
        } else {
          this.#cart = [];
          removeLocalStorageItem(LOCAL_STORAGE_KEY);
        }
      } else {
        this.#cart = [];
      }
    }
    return this.#cart;
  }

  static set cart(newCart) {
    if (this.cartIsValid(newCart)) {
      this.#cart = newCart;
      setLocalStorageItem(LOCAL_STORAGE_KEY, newCart);
    } else {
      throw new Error("The new cart is not valid");
    }
  }

  static getCartItem(cameraUUID) {
    if (typeof cameraUUID === "string") {
      const cartItemIndex = this.cart.findIndex((cartItem) => cartItem.cameraUUID === cameraUUID);
      if (cartItemIndex >= 0) {
        return this.cart[cartItemIndex];
      } else {
        throw new Error("The cart item do not exist");
      }
    } else {
      throw new Error("The camera uuid is not valid");
    }
  }

  static addCartItem(newCartItem) {
    if (this.cartItemIsValid(newCartItem)) {
      const cartItemIndex = this.cart.findIndex((cartItem) => cartItem.cameraUUID === newCartItem.cameraUUID);
      if (cartItemIndex <= -1) {
        this.cart = [...this.cart, newCartItem];
      } else {
        throw new Error("The cart item already exist");
      }
    } else {
      throw new Error("The cart item is not valid");
    }
  }

  static updateCartItem(newCartItem) {
    if (this.cartItemIsValid(newCartItem)) {
      const cartItemIndex = this.cart.findIndex((cartItem) => cartItem.cameraUUID === newCartItem.cameraUUID);
      if (cartItemIndex >= 0) {
        this.cart = this.cart.map((item, index) => cartItemIndex === index ? newCartItem : item);
      } else {
        throw new Error("The cart item do not exist");
      }
    } else {
      throw new Error("The cart item is not valid");
    }
  }

  static removeCartItem(cameraUUID) {
    if (typeof cameraUUID === "string") {
      const cartItemIndex = this.cart.findIndex((cartItem) => cartItem.cameraUUID === cameraUUID);
      if (cartItemIndex >= 0) {
        this.cart = this.cart.filter((_item, index) => cartItemIndex !== index);
      } else {
        throw new Error("The cart item do not exist");
      }
    } else {
      throw new Error("The camera uuid is not valid");
    }
  }
}

export default CartAPI;