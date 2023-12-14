const componentTemplate = document.createElement("template");

componentTemplate.innerHTML = `
  <slot></slot>
`;

export default componentTemplate;
