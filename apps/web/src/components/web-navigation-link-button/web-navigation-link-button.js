import WebButton from "@components/web-button";

class WebNavigationLinkButton extends WebButton {
  #hasBeenMountedOnce = false;

  static get observedAttributes() {
    return [...super.observedAttributes, "data-href"];
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  get href() {
    return this.dataset.href;
  }

  set href(newHref) {
    if (typeof newHref === "string") {
      this.dataset.href = newHref;
    } else {
      this.removeAttribute("data-href");
    }
  }

  #handleHref(newHref) {
    if (typeof newHref === "string") {
      this.linkElement.setAttribute("href", newHref);
    } else {
      this.linkElement.removeAttribute("href");
    }
  }

  handleClick(event) {
    event.preventDefault();
    const href = event.currentTarget.href;
    if (typeof href === "string") {
      const customEvent = new CustomEvent("web-router-href", {
        bubbles: true,
        detail: { href }
      });
      this.dispatchEvent(customEvent);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#hasBeenMountedOnce) {
      this.currentElement = this.linkElement;
      this.#hasBeenMountedOnce = true;
    }
    this.linkElement.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.linkElement.removeEventListener("click", this.handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue !== newValue) {
      switch (name) {
        case "data-href": {
          this.#handleHref(newValue);
          break;
        }
      }
    }
  }
}

export default WebNavigationLinkButton;