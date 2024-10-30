import express from "express";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const products = JSON.parse(readFileSync("tea.json", "utf-8"));
const accounts = JSON.parse(readFileSync("accounts.json", "utf-8"));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"))
app.use("/pub", express.static(path.join(__dirname, ".", "public")));

app.get("/home", (req, res) => {
  const indexPath = path.join(__dirname, ".", "public", "index.html");
  res.sendFile(indexPath);
});

app.get("/login", (req, res) => {
  const indexPath = path.join(__dirname, ".", "public", "login.html");
  res.sendFile(indexPath);
});

app.get("/products", (req, res) => {
  res.send(products);
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

app.post("/register", (req, res) => {
  const newUser = req.body;
  const accounts = JSON.parse(readFileSync("accounts.json", "utf-8"));
 
  writeFileSync('accounts.json', JSON.stringify([...accounts, newUser]))
})

app.listen(port, () => {
  console.log(`Runs on: http://localhost:${port}`);
});
