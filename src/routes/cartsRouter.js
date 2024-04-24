import express from "express";
import cartController from "../controllers/cartController.js";

const cartsRouter = express.Router();

cartsRouter.get("/", cartController.getAllCarts);
cartsRouter.post("/", cartController.createCart);
cartsRouter.get("/:cid", cartController.getCartById);
cartsRouter.post("/:cid/product/:pid", cartController.addProductToCart);

export default cartsRouter;
