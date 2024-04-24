import fs from "fs";
import path from "path";
import config from "../config/config.js";
import { json } from "express";

const carritoFilePath = path.join(config.DIRNAME, "../mocks/carrito.json");

const cartsController = {
  getAllCarts: (req, res) => {
    try {
      const carts = JSON.parse(fs.readFileSync(carritoFilePath, "utf-8"));
      res.json(carts);
    } catch (error) {
      res.status(500).json({ error: "Error getting carts" });
    }
  },

  createCart: (req, res) => {
    const carts = JSON.parse(fs.readFileSync(carritoFilePath, "utf-8"));
    try {
      const newCart = {
        id: carts.length + 1,
        products: [],
      };
      carts.push(newCart);
      fs.writeFileSync(carritoFilePath, JSON.stringify(carts, null, 2));
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: "Error creating cart" });
    }
  },

  getCartById: (req, res) => {
    try {
      const cartId = Number(req.params.cid);
      const carts = JSON.parse(fs.readFileSync(carritoFilePath, "utf-8"));
      const cart = carts.find((cart) => cart.id === cartId);
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      res.json(cart.products);
    } catch (error) {
      res.status(500).json({ error: "Error getting cart by ID" });
    }
  },
  addProductToCart: (req, res) => {
    try {
      const cartId = Number(req.params.cid);
      const productId = Number(req.params.pid);
      const quantity = req.body.quantity || 1;

      let carts = JSON.parse(fs.readFileSync(carritoFilePath, "utf-8"));
      let cart = carts.find((cart) => cart.id === cartId);
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      let productInCart = cart.products.find(
        (item) => item.product === productId
      );
      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      fs.writeFileSync(carritoFilePath, JSON.stringify(carts, null, 2));
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Error adding product to cart" });
    }
  },
};

export default cartsController;
