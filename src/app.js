require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT;
const morgan = require('morgan'); 
const session = require('express-session');
const cookieParse = require('cookie-parser')
const localsUserCheck = require('./middlewares/localsUserCheck');
const cookieCheck = require('./middlewares/cookieCheck');


const methodOverride = require('method-override');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
const userApis = require('./routes/APIs/usersApis');
const productsApis = require('./routes/APIs/productsApis');


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

app.use(cookieCheck);
app.use(localsUserCheck);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api/users', userApis);
app.use('/api/products', productsApis)


app.use(function(req, res, next) {
    next(createError(404));
  }); 
  

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('not-found');
  });

  
  app.listen(port, () => console.log('server running in http://localhost:' + port));

  
/* app.use('/*', (req, res, next) => {
    try {
        
    } catch (error) {
        res.send(error)
    }
}); */

