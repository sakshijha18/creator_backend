const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userController = require('./controllers/userController');
const goodsController = require('./controllers/goodsController');
const invoiceController = require('./controllers/invoiceController');
const contractController = require('./controllers/contractController');
const mailController = require('./controllers/mailController');
const vendorController = require('./controllers/vendorController');
const authRoutes = require('./controllers/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://127.0.0.1:27017/creatordb');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const store = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017/creatordb',
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 24, 
});

store.on('error', function (error) {
  console.error('MongoDBStore error:', error);
});

// Sesion
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json('Something went wrong!');
  next(err);
});


app.get('/', (req, res) => {
  res.send('Hello, this is backend!');
});

app.use('/', authRoutes);
app.use('/api', userController);
app.use('/api', goodsController);
app.use('/api', invoiceController);
app.use('/api', contractController);
app.use('/api', mailController);
app.use('/api', vendorController);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
