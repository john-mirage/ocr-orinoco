const componentTemplate = document.createElement("template");

componentTemplate.innerHTML = `
  <button>
    <slot></slot>
  </button>
`;

export default componentTemplate;
