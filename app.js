const express = require('express');
const path = require('path');
const port = 3049;

const app = express()

app.use(express.static('public'));
app.listen(port, () => console.log('server running in localhost://' + port));

app.get('/', (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'home.html')));
app.get('/', (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'detalleProducto.html')));
app.get('/', (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'carritoCompra.html')));
app.get('/', (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'register.html')));
app.get('/', (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'login.html')));