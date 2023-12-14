const componentTemplate = document.createElement("template");

componentTemplate.innerHTML = `
  <a>
    <slot></slot>
  </a>
`;

export default componentTemplate;
