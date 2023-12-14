import WebIconButton from "@components/orinoco-icon-button";
import ThemeAPI from "@api/theme";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const PREFERS_DARK_COLOR_SCHEME_MQ = "(prefers-color-scheme: dark)";

class OrinocoThemeIconButton extends WebIconButton {
  #hasBeenMountedOnce = false;
  #preferDarkColorSchemeMQL = window.matchMedia(PREFERS_DARK_COLOR_SCHEME_MQ);

  static get observedAttributes() {
    return [...super.observedAttributes, "theme"];
  }

  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleMediaQueryListChange =
      this.handleMediaQueryListChange.bind(this);
  }

  get theme() {
    return this.getAttribute("theme");
  }

  set theme(newTheme) {
    if (typeof newTheme === "string") {
      this.setAttribute("theme", newTheme);
    } else {
      this.removeAttribute("theme");
    }
  }

  SwitchToLightTheme() {
    ThemeAPI.theme = LIGHT_THEME;
    this.icon = "moon";
    document.documentElement.dataset.theme = LIGHT_THEME;
  }

  SwitchToDarkTheme() {
    ThemeAPI.theme = DARK_THEME;
    this.icon = "sun";
    document.documentElement.dataset.theme = DARK_THEME;
  }

  #handleTheme(theme) {
    if (theme === DARK_THEME) {
      this.SwitchToDarkTheme();
    } else {
      this.SwitchToLightTheme();
    }
  }

  handleButtonClick() {
    this.theme = this.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  }

  handleMediaQueryListChange(event) {
    this.theme = event.matches ? DARK_THEME : LIGHT_THEME;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#hasBeenMountedOnce) {
      this.upgradeProperty("theme");
      this.theme = ThemeAPI.theme;
      this.#hasBeenMountedOnce = true;
    }
    this.buttonElement.addEventListener("click", this.handleButtonClick);
    this.#preferDarkColorSchemeMQL.addEventListener(
      "change",
      this.handleMediaQueryListChange
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.buttonElement.removeEventListener("click", this.handleButtonClick);
    this.#preferDarkColorSchemeMQL.removeEventListener(
      "change",
      this.handleMediaQueryListChange
    );
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    super.attributeChangedCallback(name, oldvalue, newValue);
    if (oldvalue !== newValue) {
      switch (name) {
        case "theme": {
          this.#handleTheme(newValue);
          break;
        }
      }
    }
  }
}

customElements.define("orinoco-theme-icon-button", OrinocoThemeIconButton);

export default OrinocoThemeIconButton;
