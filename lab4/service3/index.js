import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./User.js";
import { authenticateToken, authorizeAdmin } from "./middleware.js";

dotenv.config();

const app = express();
const port = 3002;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Serwer działa poprawnie!");
});

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const role = "user"; // Domyślna rola

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).send({ id: newUser.id });
  } catch (error) {
    res.status(500).send({ error: "Failed to register user" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: "Failed to login" });
  }
});

app.get("/api/users", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

app.delete(
  "/api/users/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.send({
          message: `The user with is ${id} has been successfully deleted`,
        });
      } else {
        res.status(404).send({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ error: "Failed to delete user" });
    }
  }
);

app.listen(port, () => {
  console.log(process.env.JWT_SECRET);
  console.log(`App listening on port ${port}`);
});
