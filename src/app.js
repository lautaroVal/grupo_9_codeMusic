const express = require('express');
const path = require('path');
const port = 3049;
const morgan = require('morgan'); /* hay que hacer npm i morgan para instalar las dependencias de morgan.. */

const methodOverride = require('method-override');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/*', (req, res, next) => {
    try {
        
    } catch (error) {
        res.send(error)
    }
});


/* app.use('/', (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'index.html')));
app.use('/productDetail', (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'productDetail.html')));
app.use('/productCart', (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'productCart.html')));
app.use('/register', (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'register.html')));
app.use('/login', (req,res) => res.sendFile(path.resolve(__dirname, 'views', 'login.html'))); */

app.listen(port, () => console.log('server running in http://localhost:' + port));
/* Recuerden cuando bajan todo hacer el "npm i express" */

