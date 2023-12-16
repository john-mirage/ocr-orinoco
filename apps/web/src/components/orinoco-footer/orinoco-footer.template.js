const componentTemplate = document.createElement("template");

componentTemplate.innerHTML = `
  <footer>
    <orinoco-container>
      <orinoco-row>
        <p slot="left">Copyright Orinoco</p>
        <orinoco-link href="/" slot="right">
          <orinoco-logo></orinoco-logo>
        </orinoco-link>
      </orinoco-row>
    </orinoco-container>
  </footer>
`;

export default componentTemplate;
