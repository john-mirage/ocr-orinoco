const componentTemplate = document.createElement("template");

componentTemplate.innerHTML = `
  <orinoco-hero heading="Orinoco" paragraph="Avec Orinoco, spécialiste des appareil photos anciens, trouvez l'appareil qui vous ressemble et qui saura sublimer votre talent.">
    <orinoco-link href="/panier">
      <orinoco-button>Voir le panier</orinoco-button>
    </orinoco-link>
  </orinoco-hero>
`;

export default componentTemplate;
