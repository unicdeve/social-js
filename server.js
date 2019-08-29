const express  = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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


// use Routes
app.use("/api/user", authRoutes);
app.use("/api/post", postRoutes);


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use((error, req, res, next) => {
    if(error.name === 'UnauthorizedError') {
        res.status(401).json({error: "Invalid token; unauthorized"});
    }
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running at: ${port}`);
});