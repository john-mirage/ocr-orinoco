const componentTemplate = document.createElement("template");

componentTemplate.innerHTML = `
  <orinoco-container>
    <section>
      <h1></h1>
      <p></p>
      <slot></slot>
    </section>
  </orinoco-container>
`;

export default componentTemplate;
