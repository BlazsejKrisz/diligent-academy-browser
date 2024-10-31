import express from "express";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;
const products = JSON.parse(readFileSync("tea.json", "utf-8"));
const accounts = JSON.parse(readFileSync("accounts.json", "utf-8"));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"))
app.use("/pub", express.static(path.join(__dirname, ".", "public")));

// ROUTES FOR PAGES

app.get("/home", (req, res) => {
  const indexPath = path.join(__dirname, ".", "public", "index.html");
  res.sendFile(indexPath);
});

app.get("/cart", (req, res) => {
  const indexPath = path.join(__dirname, ".", "public", "cartpage.html");
  res.sendFile(indexPath);
});

app.get("/login", (req, res) => {
  const indexPath = path.join(__dirname, ".", "public", "login.html");
  res.sendFile(indexPath);
});

// ENDPOINTS FOR PRODUCTS

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
});


app.get("/search", (req, res) => {
  const searchInput = req.query.searchquery;
  let searchedProducts = []
  if(searchInput){
    searchedProducts = products.filter((product) => {
        if (product.name.toLowerCase().includes(searchInput)) {
          return product;
        }
      });
  } else {
    searchedProducts = products;
  }
  res.send(searchedProducts)
});

app.get("/search/category", (req, res) => {
    const searchCategory = req.query.category;
    let searchedProducts = []
    if(searchCategory){
      searchedProducts = products.filter((product) => {
          if (product.category.toLowerCase().includes(searchCategory)) {
            return product;
          }
        });
    }
    res.send(searchedProducts)
  });

// LOGIN PAGE

app.post("/register", (req, res) => {
  const newUser = req.body;
  const accounts = JSON.parse(readFileSync("accounts.json", "utf-8"));
  newUser.id = uuidv4();
  writeFileSync('accounts.json', JSON.stringify([...accounts, newUser]))
})

app.listen(port, () => {
  console.log(`Runs on: http://localhost:${port}`);
});
