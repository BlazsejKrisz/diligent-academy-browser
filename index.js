import express from 'express';
import { readFileSync, writeFileSync } from "fs";

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('public'));

const products = JSON.parse(readFileSync("tea.json", "utf-8"));

app.get("/products", (req, res) => {
    res.send(products);
})

app.listen(port, () => {
    console.log(`Runs on: http://localhost:${port}`);
});