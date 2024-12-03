import dotenv from "dotenv";
import { Book } from "./Book.js";
import express from "express";
import { authenticateToken, authorizeAdmin } from "./middleware.js";

dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());

app.get("/api/books", async (req, res) => {
  const books = await Book.findAll();
  res.send(books);
});

app.get("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);

  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ error: "Book not found" });
  }
});

app.post("/api/books", authenticateToken, authorizeAdmin, async (req, res) => {
  const { title, author, year } = req.body;
  const book = await Book.create({ title, author, year });
  res.send({ id: book.id });
});

app.delete(
  "/api/books/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (book) {
      await book.destroy();
      res.send({ message: "Book deleted successfully" });
    } else {
      res.status(404).send({ error: "Book not found" });
    }
  }
);

app.listen(port, () => {
  console.log("JWT_SECRET: ", process.env.JWT_SECRET);
  console.log(`App listening on port ${port}`);
});
