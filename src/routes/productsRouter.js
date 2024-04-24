import express from "express";
import productsController from "../controllers/productsControllers.js";

const productsRouter = express.Router();

productsRouter.get("/", productsController.getAllProducts);
productsRouter.get("/:pid", productsController.getProductById);
productsRouter.post("/", productsController.addProduct);
productsRouter.put("/:pid", productsController.updateProduct);
productsRouter.delete("/:pid", productsController.deleteProduct);

export default productsRouter;
