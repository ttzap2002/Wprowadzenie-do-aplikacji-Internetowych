import express from "express";
import { Order } from "./Order.js";
import axios from "axios";
import dotenv from "dotenv";
import { authenticateToken } from "./middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
const port = 3001;

app.get("/api/orders/all", async (req, res) => {
  const orders = await Order.findAll();

  res.send(orders);
});

app.get("/api/orders/:userId", async (req, res) => {
  const { userId } = req.params;
  const orders = await Order.findAll({ where: { userId } });

  res.send(orders);
});

app.post("/api/orders", async (req, res) => {
  const { userId, bookId, quantity } = req.body;
  try {
    const response = await axios.get(
      `http://localhost:3000/api/books/${bookId}`
    );
    if (!response.data) {
      return res.status(404).send({ error: "Book not found" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: "Failed to fetch book information" });
  }

  try {
    const newOrder = await Order.create({ userId, bookId, quantity });
    res.status(201).send({ id: newOrder.id });
  } catch (error) {
    res.status(500).send({ error: "Failed to create order" });
  }
});

app.delete("/api/orders/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id);

  if (order) {
    await order.destroy();
    res.send({ message: "Order deleted successfully" });
  } else {
    res.status(404).send({ error: "Order not found" });
  }
});

app.patch("/api/orders/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { bookId, ...orderPatch } = req.body;

  const order = await Order.findByPk(id);

  if (!order) {
    return res.status(404).send({ error: "Order not found" });
  }

  if (bookId) {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/books/${bookId}`
      );
      if (!response.data) {
        return res.status(404).send({ error: "Book not found" });
      }
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .send({ error: "Failed to fetch book information" });
    }
  }

  try {
    await order.update({ bookId, ...orderPatch });
    res.send({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to update order" });
  }
});

app.listen(port, () => {
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  console.log(`App listening on port ${port}`);
});
