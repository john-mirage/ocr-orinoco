require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");

const productMap = require("./models/product");
const productRoutes = require("./routes/product");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "images")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((request, _response, next) => {
  request.context = { productMap: productMap };
  next();
});

app.use("/products", productRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${process.env.PORT}`),
);
