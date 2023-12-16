import classes from "./web-feature-list.module.css";

class WebFeatureList extends HTMLElement {
  #hasBeenMountedOnce = false;
  #webGrid = document.createElement("ul", { is: "web-grid" });
  #listItemElement = document.createElement("li");
  #webFeature = document.createElement("web-feature");
  #features;

  constructor() {
    super();
  }

  get features() {
    return this.#features;
  }

  set features(newFeatures) {
    if (this.#features !== newFeatures) {
      if (this.featuresAreValid(newFeatures)) {
        const listItemElements = newFeatures.map((feature) => {
          const listItemElement = this.#listItemElement.cloneNode(true);
          const webFeature = this.#webFeature.cloneNode(true);
          webFeature.title = feature.title;
          webFeature.description = feature.description;
          listItemElement.replaceChildren(webFeature);
          return listItemElement;
        });
        this.#webGrid.replaceChildren(...listItemElements);
      } else {
        this.#webGrid.replaceChildren();
      }
    }
  }

  featureIsValid(feature) {
    return (
      Object.keys(feature).length === 2 &&
      typeof feature.title === "string" &&
      typeof feature.description === "string"
    );
  }

  featuresAreValid(features) {
    return (
      Array.isArray(features) &&
      features.every(this.featureIsValid)
    );
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-feature-list"]);
      this.replaceChildren(this.#webGrid);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebFeatureList;