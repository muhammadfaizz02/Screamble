require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require('cors')
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Received Token:", token);
  if (token == null) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.use(express.json());

app.use(cors());

app.options('*', cors());

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.id }, secret);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// create a book
app.post(
  "/products",
  authenticateTokenMiddleware,
  upload.single("image"),
  async (req, res) => {
    const { name, price, discount, description, link } = req.body;
    try {
      const product = await prisma.product.create({
        data: {
          name,
          price: parseInt(price),
          discount: parseInt(discount),
          description,
          link,
          image: req.file.path, // add the path to the uploaded image to the product data
        },
      });
      res.json({ product });
    } catch (err) {
      console.log("err", err);
      res.status(400).json({ message: "Book already exists" });
    }
  }
);

// get all books
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json({ products });
});

// edit a book
app.put("/products/:id", authenticateTokenMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, discount, description, link } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price,
        discount,
        description,
        link
      },
    });
    res.json({ product });
  } catch (err) {
    console.log(err);
  }
});


// delete a book
app.delete("/products/:id", authenticateTokenMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.json({ product });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// get book by id
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    res.json({ product });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// Start the server
app.listen(7000, () => {
  console.log("Server started on port 3000");
});
