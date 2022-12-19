/* -- REQUIRES --*/
require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT;
const morgan = require('morgan'); 
const session = require('express-session');
const cookieParse = require('cookie-parser');
const localsUserCheck = require('./middlewares/localsUserCheck');
const cookieCheck = require('./middlewares/cookieCheck');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();

/* -- MIDDLEWARES --*/
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParse());
app.use(session({
  secret: 'Code Music secret',
  resave: false,
  saveUninitialized: true
}));
app.use(cors());

app.use(cookieCheck);
app.use(localsUserCheck);

/* -- ROUTES --*/
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));

app.use('/api/auth', require("./routes/APIs/auth"));
app.use('/api/users', require('./routes/APIs/apiUsers'));
app.use('/api/products', require('./routes/APIs/apiProducts'));
app.use('/api/categories', require('./routes/APIs/apiCategories'));
app.use('/api/carts', require('./routes/APIs/apiCarts'));


app.use((req, res, next) => {
    try {
        return res.status(404).render('not-found')
    } catch (error) {
        console.log(error);
    }
});


  /* -- STARTING THE SERVER --*/
  app.listen(port, () => console.log('server running in http://localhost:' + port));

  


