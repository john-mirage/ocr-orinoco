import WebIconButton from "@components/web-icon-button";
import ThemeAPI from "@api/theme.api";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const PREFERS_DARK_COLOR_SCHEME_MQ = "(prefers-color-scheme: dark)";

class WebThemeSwitch extends WebIconButton {
  #hasBeenMountedOnce = false;
  #preferDarkColorSchemeMQL = window.matchMedia(PREFERS_DARK_COLOR_SCHEME_MQ);

  static get observedAttributes() {
    return [...super.observedAttributes, "data-theme"];
  }

  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleMediaQueryListChange = this.handleMediaQueryListChange.bind(this);
  }

  get theme() {
    return this.dataset.theme;
  }

  set theme(newTheme) {
    if (typeof newTheme === "string") {
      this.dataset.theme = newTheme;
    } else {
      this.removeAttribute("data-theme");
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

  handleTheme(theme) {
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
      this.theme = ThemeAPI.theme;
      this.#hasBeenMountedOnce = true;
    }
    this.buttonElement.addEventListener("click", this.handleButtonClick);
    this.#preferDarkColorSchemeMQL.addEventListener("change", this.handleMediaQueryListChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.buttonElement.removeEventListener("click", this.handleButtonClick);
    this.#preferDarkColorSchemeMQL.removeEventListener("change", this.handleMediaQueryListChange);
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    super.attributeChangedCallback(name, oldvalue, newValue);
    if (oldvalue !== newValue) {
      switch (name) {
        case "data-theme": {
          this.handleTheme(newValue);
          break;
        }
      }
    }
  }
}

export default WebThemeSwitch;