const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);
 
 async function selectCostumers(){
    const results = await client.query("SELECT * FROM clientes;");
   return results[0];
}
async function selectCostumer(id){
    return clientes.find(c => c.id === id)
}
async function insertCostumer(clientes){
    const values = [clientes.nome, clientes.email, clientes.senha, clientes.CPF]
    await client.query("INSERT INTO clientes(nome,email,senha,CPF) VALUES(?,?,?,?);", values);
   
}
function updateCostumer(id, clienteData){
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return;
    cliente.nome = clienteData.nome;
    cliente.idade = clienteData.idade;
    cliente.uf = clienteData.uf;
}  
function deleteCostumer(id){
const index = clientes.findIndex(c => c.id === id);
 clientes.splice(index, 1);
} 
module.exports = {
    selectCostumers,
    selectCostumer,
    insertCostumer,
    updateCostumer,
    deleteCostumer

}