const express  = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();


// DB config
const db = process.env.MONGO_URI;


// fixing deprecations
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// connect to mongoDB
mongoose.connect(db, {
  useNewUrlParser: true
})
  .then(() => {
    console.log('mongoDB connected');
  })
  .catch(err => console.log(err));


// import routes
const postRoutes = require('./api/routes/post');
const authRoutes = require('./api/routes/auth');


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(expressValidator());


// use Routes
app.use("/api/post", postRoutes);
app.use("/api/user", authRoutes);


const port = process.env.PORT || 4012;
app.listen(port, () => {
    console.log(`Server running at: ${port}`);
});