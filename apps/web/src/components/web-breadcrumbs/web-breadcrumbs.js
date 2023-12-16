const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

class WebBreadcrumbs extends HTMLElement {
  #hasBeenMountedOnce = false;
  #listElement = document.createElement("ul");
  #listItemElement = document.createElement("li");
  #arrowElement = document.createElement("div");
  #iconElement = document.createElementNS(SVG_NAMESPACE, "svg");
  #iconShapeElement = document.createElementNS(SVG_NAMESPACE, "use");

  static get observedAttributes() {
    return ["data-path"];
  }
  
  constructor() {
    super();
    this.#listElement.classList.add("flex", "flex-row", "justify-start", "items-center", "h-48", "px-16", "rounded-lg", "shadow-lg", "overflow-hidden", "bg-neutral-800");
    this.#listItemElement.classList.add("flex", "flex-row", "justify-center", "items-center", "h-full");
    this.#arrowElement.classList.add("z-0", "ml-16", "mr-24", "w-12", "h-12", "border-t", "border-r", "border-neutral-500", "rotate-45");
    this.#iconElement.classList.add("z-10", "w-20", "h-20");
    this.#listElement.replaceChildren("Chargement...");
  }

  get path() {
    return this.dataset.path;
  }

  set path(newPath) {
    if (typeof newPath === "string") {
      this.dataset.path = newPath;
    } else {
      this.removeAttribute("data-path");
    }
  }

  createListItem(hasArrow = true) {
    if (typeof hasArrow === "boolean") {
      const listItemElement = this.#listItemElement.cloneNode(true);
      if (hasArrow) {
        const arrowElement = this.#arrowElement.cloneNode(true);
        listItemElement.replaceChildren(arrowElement);
      }
      return listItemElement;
    } else {
      throw new Error("The parameters are not valid");
    }
  }

  createIconListItem(icon, hasArrow = true) {
    if (typeof icon === "string" && typeof hasArrow === "boolean") {
      const listItemElement = this.createListItem(hasArrow);
      const iconElement = this.#iconElement.cloneNode(true);
      const iconShapeElement = this.#iconShapeElement.cloneNode(true);
      iconShapeElement.setAttribute("href", `#icon-${icon}`);
      iconElement.replaceChildren(iconShapeElement);
      listItemElement.prepend(iconElement);
      return listItemElement;
    } else {
      throw new Error("The parameters are not valid");
    }
  }

  createTextListItem(text, hasArrow = true) {
    if (typeof text === "string" && typeof hasArrow === "boolean") {
      const listItemElement = this.createListItem(hasArrow);
      listItemElement.prepend(text);
      return listItemElement;
    } else {
      throw new Error("The parameters are not valid");
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("my-32", "block", "container", "text-body", "text-neutral-400");
      this.replaceChildren(this.#listElement);
      this.#hasBeenMountedOnce = true;
    }
  }

  handlePath(path) {
    this.#listElement.replaceChildren(this.createIconListItem("home"));
    if (typeof path === "string") {
      const pathnames = path.split("/");
      this.#listElement.append(...pathnames.map((pathname, index) => (
        (pathnames.length - 1) !== index
          ? this.createTextListItem(pathname)
          : this.createTextListItem(pathname, false)
      )));
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-path": {
        this.handlePath(newValue);
        break;
      }
    }
  }
}

export default WebBreadcrumbs;