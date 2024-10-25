import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Runs on: http://localhost:${port}`);
});