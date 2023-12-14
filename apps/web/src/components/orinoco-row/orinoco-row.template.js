const componentTemplate = document.createElement("template");

componentTemplate.innerHTML = `
  <div class="section section--left">
    <slot name="left"></slot>
  </div>
  <div class="section section--right">
    <slot name="right"></slot>
  </div>
`;

export default componentTemplate;
