const componentTemplate = document.createElement("template");

componentTemplate.innerHTML = `
  <orinoco-hero heading="Titre" paragraph="Voici un paragraph d'exemple">
    <orinoco-link href="/orinoco/panier">
      <orinoco-button>Voir le panier</orinoco-button>
    </orinoco-link>
  </orinoco-hero>
`;

export default componentTemplate;
