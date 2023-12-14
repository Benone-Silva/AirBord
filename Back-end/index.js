require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const db = require("./db");
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(express.json());

app.delete("/clientes/:id", (request,response) =>{
    const id = parseInt(request.params.id);
    db.deleteCostumer(id);
    response.sendStatus(204);
})

app.patch("/clientes/:id", (request,response) =>{
    const id = parseInt(request.params.id);
    const cliente = request.body;
    db.updateCostumer(id,cliente);
    response.sendStatus(200);
})
app.post("/cadastro",async (request,response) =>{
    const cliente = request.body;
   await db.insertCostumer(cliente);
    response.sendStatus(201);
})
app.get("/clientes", async (request, response) => {
    const results = await db.selectCostumers()
    response.json(results);
})
app.get("/clientes/:id", (request, response) => {
    const id = parseInt(request.params.id);
    response.json(db.selectCostumer(id));
})
app.get("/cadastro", (request, response) => {
    response.sendFile(path.join(__dirname, 'cadastro.html'));
})
app.get('/PaginaInicial', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT, () =>{
    console.log("APP is running")
})
