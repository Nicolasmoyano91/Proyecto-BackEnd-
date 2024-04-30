import fs from "fs";
import config from "../config/config.js";
import path from "path";

const productosFilePath = path.join(config.DIRNAME, "../mocks/productos.json");

const productsController = {
  getAllProducts: (req, res) => {
    try {
      const products = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Error obtaining the products" });
    }
  },
  getProductById: (req, res) => {
    try {
      const productId = Number(req.params.pid);
      const products = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
      const product = products.find((product) => product.id === productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error getting product by ID" });
    }
  },
  addProduct: (req, res) => {
    try {
      const products = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
      const newProduct = {
        id: products.length + 1,
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails || [],
      };

      products.push(newProduct);
      fs.writeFileSync(productosFilePath, JSON.stringify(products, null, 2));
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Error adding product" });
    }
  },
  updateProduct: (req, res) => {
    try {
      const productId = Number(req.params.pid);
      const updatedFields = req.body;

      const products = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
      const index = products.findIndex((product) => product.id === productId);
      if (index === -1) {
        return res.status(404).json({ error: "Product not found" });
      }

      products[index] = { ...products[index], ...updatedFields };
      fs.writeFileSync(productosFilePath, JSON.stringify(products, null, 2));
      res.json(products[index]);
    } catch (error) {
      res.status(500).json({ error: "Error updating product" });
    }
  },
  deleteProduct: (req, res) => {
    try {
      const productId = Number(req.params.pid);
      const products = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
      const filteredProducts = products.filter(
        (product) => product.id !== productId
      );
      if (filteredProducts.length === products.length) {
        return res.status(404).json({ error: "Product not found" });
      }
      fs.writeFileSync(
        productosFilePath,
        JSON.stringify(filteredProducts, null, 2)
      );
      res.json({ message: "Product disposed correctly" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting product" });
    }
  },
};

export default productsController;
