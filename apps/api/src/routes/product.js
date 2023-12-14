const express = require("express");
const router = express.Router();

const getProductWithFullImagePath = (request, product) => {
  return {
    ...product,
    image: `${request.protocol}://${request.get("host")}/images/${product.image}`,
  };
};

router.get("/", (request, response) => {
  const products = [...request.context.productMap.values()];
  return response.send(products.map((product) => getProductWithFullImagePath(request, product)));
});

router.get("/:productId", (request, response) => {
  const productId = request.params.productId;
  const product = request.context.productMap.get(productId);
  return response.send(getProductWithFullImagePath(request, product));
});

module.exports = router;