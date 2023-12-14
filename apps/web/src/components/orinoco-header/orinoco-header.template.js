const componentTemplate = document.createElement("template");

componentTemplate.innerHTML = `
  <header>
    <orinoco-container>
      <orinoco-row>
        <orinoco-link href="/orinoco/" slot="left">
          <orinoco-logo></web-logo>
        </orinoco-link>
        <orinoco-theme-icon-button slot="right"></orinoco-theme-icon-button>
      </orinoco-row>
    </orinoco-container>
  </header>
`;

export default componentTemplate;
