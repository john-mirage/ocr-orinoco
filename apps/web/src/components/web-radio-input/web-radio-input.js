class WebRadioInput extends HTMLLabelElement {
  #labelElement = document.createElement("span");
  #inputElement = document.createElement("input");

  constructor() {
    super();
  }
}

export default WebRadioInput;