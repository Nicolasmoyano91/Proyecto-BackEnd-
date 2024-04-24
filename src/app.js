import express from "express";
import productsRouter from "../routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import config from "./config/config.js";

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/static", express.static(`${config.DIRNAME}/public`));

app.listen(config.PORT, () => {
  console.log(`App activa en puerto ${config.PORT}`);
});
