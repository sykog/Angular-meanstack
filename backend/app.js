let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dataBaseConfig = require('./database/db');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true
}).then(() => console.log('Database connected sucessfully '),
  error => console.log('Could not connected to database : ' + error)
);

// Set up express js port
const userRoute = require('../backend/routes/user.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/Angular-meanstack')));
app.use('/', express.static(path.join(__dirname, 'dist/Angular-meanstack')));
app.use('/api', userRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((request, response, next) => {
  next(createError(404));
});

// error handler
app.use(function (error, request, response, next) {
  console.error(error.message);
  if (!error.statusCode) error.statusCode = 500;
  response.status(error.statusCode).send(error.message);
});