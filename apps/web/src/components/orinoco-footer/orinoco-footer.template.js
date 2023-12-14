const componentTemplate = document.createElement("template");

componentTemplate.innerHTML = `
  <footer>
    <orinoco-container>
      <orinoco-row>
        <p slot="left">Copyright Orinoco</p>
        <orinoco-link href="/orinoco/" slot="right">
          <orinoco-logo></web-logo>
        </orinoco-link>
      </orinoco-row>
    </orinoco-container>
  </footer>
`;

export default componentTemplate;
