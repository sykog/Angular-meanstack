const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../database/model/User');

// Add User
userRoute.route('/add-user').post((request, response, next) => {
  User.create(request.body, (error, data) => {
    if (error) return next(error);
    else response.json(data);
  });
});

// Get all users
userRoute.route('/').get((request, response) => {
  User.find((error, data) => {
    if (error) return next(error);
    else response.json(data);
  });
});

// Get user by id
userRoute.route('/read-user/:id').get((request, response, next) => {
  User.findById(request.params.id, (error, data) => {
    if (error) return next(error);
    else response.json(data);
  });
});

// Update user
userRoute.route('/update-user/:id').put((request, response, next) => {
  User.findByIdAndUpdate(request.params.id, {
    $set: request.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error);
    } else {
      response.json(data);
      console.log('User successfully updated!');
    }
  });
});

// Delete user
userRoute.route('/delete-user/:id').delete((request, response, next) => {
  User.findByIdAndRemove(request.params.id, (error, data) => {
    if (error) return next(error);
    else response.status(200).json({msg: data});
  });
});

module.exports = userRoute;