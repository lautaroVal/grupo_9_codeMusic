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

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* -- ROUTES --*/
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

const mainApi = require('./routes/APIs/apiMain');
const userApi = require('./routes/APIs/apiUsers');
const productsApi = require('./routes/APIs/apiProducts');

/* -- MIDDLEWARES --*/
app.use(cookieParse());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(session({
  secret: 'Code Music secret',
  resave: false,
  saveUninitialized: true
}));
app.use(cors());

app.use(cookieCheck);
app.use(localsUserCheck);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.use('/api', mainApi);
app.use('/api/users', userApi);
app.use('/api/products', productsApi)


app.use((req, res, next) => {
    try {
        return res.status(404).render('not-found')
    } catch (error) {
        console.log(error);
    }
});


  /* -- STARTING THE SERVER --*/
  app.listen(port, () => console.log('server running in http://localhost:' + port));


  


