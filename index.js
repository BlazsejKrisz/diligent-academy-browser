import express from "express";
import { readFileSync, writeFileSync } from "fs";

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static("public"));

const products = JSON.parse(readFileSync("tea.json", "utf-8"));

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

app.listen(port, () => {
  console.log(`Runs on: http://localhost:${port}`);
});
