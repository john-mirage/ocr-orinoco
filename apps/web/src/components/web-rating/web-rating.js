import classes from "./web-rating.module.css";

class WebRating extends HTMLElement {
  #hasBeenMountedOnce = false;
  #webRatingStar = document.createElement("web-rating-star");
  #webRatingStars = new Array(5).fill(undefined).map(() => this.#webRatingStar.cloneNode(true));

  static get observedAttributes() {
    return ["data-score"];
  }

  constructor() {
    super();
  }

  get score() {
    return this.dataset.score;
  }

  set score(newScore) {
    if (typeof newScore === "string") {
      this.dataset.score = newScore;
    } else {
      this.removeAttribute("data-score");
    }
  }

  handleScore(newScore) {
    let score = 0;
    if (typeof newScore === "string") {
      const newScoreAsNumber = Number(newScore);
      if (
        !isNaN(newScoreAsNumber) &&
        newScoreAsNumber >= 1 &&
        newScoreAsNumber <= 5
      ) {
        score = newScoreAsNumber;
      }
    }
    this.#webRatingStars.forEach((webRatingStar, index) => {
      webRatingStar.active = score > index;
    });
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add(classes["web-rating"]);
      this.replaceChildren(...this.#webRatingStars);
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    if (oldvalue !== newValue) {
      switch (name) {
        case "data-score": {
          this.handleScore(newValue);
          break;
        }
      }
    }
  }
}

export default WebRating;